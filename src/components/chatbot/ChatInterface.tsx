'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic } from 'lucide-react';
import { useAstrabon } from './AstrabonContext';
import { ProductCarousel } from './ProductCarousel';
import { LeadCaptureFlow } from './LeadCaptureFlow';
import { generateBotResponse, detectLeadTrigger, DEMO_SCRIPT } from '@/data/chat-scripts';
import type { Product } from '@/types';

const WELCOME_PROMPTS = [
  { label: 'Help me find cookware', icon: '🍳' },
  { label: "I'm buying for a restaurant or café", icon: '🏪' },
  { label: 'Compare cookware materials', icon: '⚖️' },
  { label: 'Show kitchen starter essentials', icon: '🔪' },
  { label: 'Help me choose knives', icon: '🗡️' },
  { label: 'Find coffee essentials', icon: '☕' },
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full border border-primary/20 overflow-hidden shrink-0">
        <img src="/chatbot/chatbot-avatar.jpeg" alt="Dhon" className="w-full h-full object-cover" />
      </div>
      <div className="bg-primary/10 border border-primary/15 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-primary typing-dot" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary typing-dot" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary typing-dot" />
        </div>
      </div>
    </div>
  );
}

export function ChatInterface() {
  const {
    chatHistory, addMessage, flowState, setFlowState,
    buyerType, setBuyerType, productCategory, setProductCategory,
    priority, setPriority, isTyping, setIsTyping,
    lastBotQuestion, isDemoMode, demoStep, setDemoStep,
    isCapturingLead, setIsCapturingLead, messageCount,
  } = useAstrabon();

  const [inputValue, setInputValue] = useState('');
  // Track which messages have had their options selected
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping, scrollToBottom]);

  // Listen for external prompts (from category cards, hero CTA)
  useEffect(() => {
    const handleExternalPrompt = (e: CustomEvent) => {
      if (e.detail?.prompt) {
        handleSend(e.detail.prompt);
      }
    };
    window.addEventListener('astrabon:send-prompt', handleExternalPrompt as EventListener);
    return () => window.removeEventListener('astrabon:send-prompt', handleExternalPrompt as EventListener);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowState, buyerType, productCategory, priority, messageCount, lastBotQuestion, isCapturingLead]);

  const simulateBotResponse = useCallback(
    (text: string) => {
      setIsTyping(true);
      const delay = Math.min(600 + text.length * 12, 2200);
      setTimeout(() => {
        setIsTyping(false);
        const response = generateBotResponse(text, {
          flowState,
          buyerType,
          category: productCategory,
          priority,
          messageCount,
          lastBotQuestion,
        });

        // Update flow state from response
        if (response.type === 'lead-form' || response.leadForm) {
          setIsCapturingLead(true);
          setFlowState('lead-capture');
        } else if (response.nextFlowState) {
          setFlowState(response.nextFlowState as typeof flowState);
        }

        addMessage({
          sender: 'bot',
          type: response.type as ChatMessage['type'],
          text: response.text,
          options: response.options,
          products: response.products,
        });

        // Detect buyer type from intent
        const lower = text.toLowerCase();
        if (lower.includes('café') || lower.includes('cafe') || lower.includes('coffee shop')) setBuyerType('cafe');
        else if (lower.includes('restaurant') || lower.includes('bistro')) setBuyerType('restaurant');
        else if (lower.includes('hotel') || lower.includes('resort')) setBuyerType('hotel');
        else if (lower.includes('home') || lower.includes('everyday') || lower.includes('personal')) setBuyerType('home');
        else if (lower.includes('gift')) setBuyerType('gift');
        else if (lower.includes('office')) setBuyerType('office');

      }, delay);
    },
    [flowState, buyerType, productCategory, priority, messageCount, lastBotQuestion, addMessage, setIsTyping, setFlowState, setIsCapturingLead, setBuyerType]
  );

  // Demo mode runner
  const runDemoStep = useCallback(async () => {
    if (demoStep >= DEMO_SCRIPT.length) return;
    const step = DEMO_SCRIPT[demoStep];

    // Type user message with delay
    let typed = '';
    for (const char of step.userText) {
      await new Promise(r => setTimeout(r, 35));
      typed += char;
      setInputValue(typed);
    }
    await new Promise(r => setTimeout(r, 400));
    setInputValue('');

    addMessage({ sender: 'user', text: step.userText, type: 'text' });
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      addMessage({
        sender: 'bot',
        text: step.botText,
        type: step.type,
        options: 'options' in step ? step.options : undefined,
        products: 'products' in step ? step.products as Product[] : undefined,
      });
      setDemoStep(demoStep + 1);
    }, 1500);
  }, [demoStep, addMessage, setIsTyping, setDemoStep]);

  const handleSend = (text?: string) => {
    const msg = (text ?? inputValue).trim();
    if (!msg) return;
    setInputValue('');
    addMessage({ sender: 'user', text: msg, type: 'text' });

    // Lead capture short-circuit
    if (isCapturingLead) return;

    // Check for soft lead triggers (medium/high intent)
    const leadTrigger = detectLeadTrigger(msg);
    if (leadTrigger === 'high') {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setIsCapturingLead(true);
        setFlowState('lead-capture');
        addMessage({
          sender: 'bot',
          text: "Great! I can pass this to the Astrabon team so they can help you quickly. Please share:\n\nYour name",
          type: 'text',
        });
      }, 800);
      return;
    }

    // Check if it's a connect-to-team trigger
    if (['connect', 'team', 'speak to', 'contact', 'inquire', 'collect my details']
      .some(k => msg.toLowerCase().includes(k))) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setIsCapturingLead(true);
        setFlowState('lead-capture');
        addMessage({
          sender: 'bot',
          text: "Great! I can pass this to the Astrabon team so they can help you quickly. Please share:\n\nYour name",
          type: 'text',
        });
      }, 800);
      return;
    }

    simulateBotResponse(msg);
  };

  const handleOptionClick = (option: string, messageId: string) => {
    // Mark this message's options as selected
    setSelectedOptions(prev => new Set(prev).add(messageId));

    if (option.toLowerCase().includes('connect') || option.toLowerCase().includes('team') || option.toLowerCase().includes('collect my details')) {
      addMessage({ sender: 'user', text: option, type: 'text' });
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setIsCapturingLead(true);
        setFlowState('lead-capture');
        addMessage({ sender: 'bot', text: "Great! Let's get your details so the team can follow up. What's your name?", type: 'text' });
      }, 800);
      return;
    }
    handleSend(option);
  };

  const handleInquire = (product: Product) => {
    addMessage({ sender: 'user', text: `I'm interested in: ${product.name}`, type: 'text' });
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setIsCapturingLead(true);
      setFlowState('lead-capture');
      setProductCategory(product.category);
      addMessage({
        sender: 'bot',
        text: `Great choice — ${product.name} is an excellent option. I'll pass this to the Astrabon team. First, what's your name?`,
        type: 'text',
      });
    }, 900);
  };

  // ─── WELCOME SCREEN ───────────────────────────────────────────────────────────
  if (chatHistory.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col justify-end px-5 pb-5 overflow-y-auto no-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full border border-primary/25 overflow-hidden">
                <img src="/chatbot/chatbot-avatar.jpeg" alt="Dhon" className="w-full h-full object-cover" />
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-text-primary font-light leading-relaxed max-w-[85%]">
                👋 Hi! I&#39;m Dhon, your Astrabon assistant. I can help you find the right kitchenware, cookware, coffee essentials, glassware, and more.
                <br /><br />
                <span className="text-primary font-medium">What are you shopping for today?</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Prompts */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            {WELCOME_PROMPTS.map((prompt, i) => (
              <motion.button
                key={prompt.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                onClick={() => handleSend(prompt.label)}
                className="flex items-center gap-2 p-3 rounded-xl bg-surface-alt/60 border border-border-subtle hover:border-primary/40 hover:bg-primary/8 text-left transition-all group"
              >
                <span className="text-base">{prompt.icon}</span>
                <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors leading-snug">
                  {prompt.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Input */}
        <InputBar
          value={inputValue}
          onChange={setInputValue}
          onSend={() => handleSend()}
          onDemoStep={isDemoMode ? runDemoStep : undefined}
          isDemoMode={isDemoMode}
          demoStep={demoStep}
          demoTotal={DEMO_SCRIPT.length}
        />
      </div>
    );
  }

  // ─── CHAT SCREEN ──────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 px-5 pt-5 pb-3 overflow-y-auto no-scrollbar space-y-4">
        {chatHistory.map((msg) => {
          const isOptionSelected = selectedOptions.has(msg.id);
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              {/* Bot Avatar for bot messages */}
              {msg.sender === 'bot' && (msg.type === 'text' || msg.type === 'options') && (
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full border border-primary/20 overflow-hidden shrink-0 mb-1">
                    <img src="/chatbot/chatbot-avatar.jpeg" alt="Dhon" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-primary/10 border border-primary/15 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                    <p className="text-sm text-text-primary font-light leading-relaxed whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              )}

              {/* User message */}
              {msg.sender === 'user' && (
                <div className="bg-surface-alt border border-border-subtle rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                  <p className="text-sm text-text-primary font-light">{msg.text}</p>
                </div>
              )}

              {/* Options chips */}
              {msg.type === 'options' && msg.options && (
                <div className="flex flex-wrap gap-2 mt-2 pl-9">
                  {msg.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleOptionClick(opt, msg.id)}
                      disabled={isOptionSelected}
                      className={`px-3 py-1.5 rounded-full border text-xs transition-all duration-300 ${
                        isOptionSelected
                          ? 'bg-surface-alt/30 border-border-subtle text-text-muted/50 cursor-default'
                          : 'bg-surface-alt/60 border-border-subtle text-text-secondary hover:bg-primary hover:text-text-on-primary hover:border-primary'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Product cards */}
              {msg.type === 'product-cards' && msg.products && (
                <div className="w-full mt-2 pl-9">
                  {msg.text && msg.sender === 'bot' && (
                    <div className="flex items-end gap-2 mb-3">
                      <div className="w-7 h-7 rounded-full border border-primary/20 overflow-hidden shrink-0">
                        <img src="/chatbot/chatbot-avatar.jpeg" alt="Dhon" className="w-full h-full object-cover" />
                      </div>
                      <div className="bg-primary/10 border border-primary/15 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                        <p className="text-sm text-text-primary font-light leading-relaxed whitespace-pre-line">{msg.text}</p>
                      </div>
                    </div>
                  )}
                  <ProductCarousel products={msg.products} onInquire={handleInquire} />
                  {msg.options && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt, msg.id)}
                          disabled={isOptionSelected}
                          className={`px-3 py-1.5 rounded-full border text-xs transition-all duration-300 ${
                            isOptionSelected
                              ? 'bg-surface-alt/30 border-border-subtle text-text-muted/50 cursor-default'
                              : 'bg-surface-alt/60 border-border-subtle text-text-secondary hover:bg-primary hover:text-text-on-primary hover:border-primary'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Lead form */}
              {msg.type === 'lead-form' && (
                <div className="w-full mt-2">
                  <LeadCaptureFlow />
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Typing Indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lead capture form (active) */}
        {isCapturingLead && <LeadCaptureFlow />}

        <div ref={messagesEndRef} />
      </div>

      <InputBar
        value={inputValue}
        onChange={setInputValue}
        onSend={() => handleSend()}
        onDemoStep={isDemoMode ? runDemoStep : undefined}
        isDemoMode={isDemoMode}
        demoStep={demoStep}
        demoTotal={DEMO_SCRIPT.length}
        disabled={isCapturingLead}
      />
    </div>
  );
}

// ─── Input Bar ────────────────────────────────────────────────────────────────
function InputBar({
  value, onChange, onSend, onDemoStep, isDemoMode, demoStep, demoTotal, disabled
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onDemoStep?: () => void;
  isDemoMode?: boolean;
  demoStep?: number;
  demoTotal?: number;
  disabled?: boolean;
}) {
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 border-t border-border-subtle bg-surface/60 backdrop-blur-md shrink-0">
      {isDemoMode && onDemoStep && (demoStep ?? 0) < (demoTotal ?? 0) && (
        <button
          onClick={onDemoStep}
          className="w-full mb-3 py-2 rounded-xl bg-primary/15 border border-primary/25 text-primary text-xs font-bold uppercase tracking-wider hover:bg-primary hover:text-text-on-primary transition-all"
        >
          ▶ Run Next Demo Step ({(demoStep ?? 0) + 1}/{demoTotal})
        </button>
      )}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKey}
          disabled={disabled}
          placeholder={disabled ? 'Please complete the form above...' : 'Type a message or ask a question...'}
          className="w-full bg-surface-alt/60 border border-border-subtle rounded-2xl pl-5 pr-20 py-4 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-50"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <button
            type="button"
            className="w-8 h-8 rounded-xl flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={onSend}
            disabled={!value.trim() || disabled}
            className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-text-on-primary hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Type for ChatMessage used in the component (local reference)
type ChatMessage = import('@/types').ChatMessage;
