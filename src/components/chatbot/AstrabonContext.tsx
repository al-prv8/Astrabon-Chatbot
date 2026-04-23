'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { ChatMessage, FlowState, BuyerType, LeadData, Product } from '@/types';

interface AstrabonContextType {
  // Widget state
  isExpanded: boolean;
  setIsExpanded: (v: boolean) => void;

  // Chat
  chatHistory: ChatMessage[];
  addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;

  // Flow state
  flowState: FlowState;
  setFlowState: (s: FlowState) => void;
  buyerType: BuyerType;
  setBuyerType: (t: BuyerType) => void;
  productCategory: string | null;
  setProductCategory: (c: string | null) => void;
  priority: string | null;
  setPriority: (p: string | null) => void;

  // Lead capture
  leadData: LeadData;
  setLeadData: (d: LeadData) => void;
  isCapturingLead: boolean;
  setIsCapturingLead: (v: boolean) => void;
  leadStep: 'name' | 'businessName' | 'email' | 'phone' | 'done';
  setLeadStep: (s: 'name' | 'businessName' | 'email' | 'phone' | 'done') => void;

  // Typing indicator
  isTyping: boolean;
  setIsTyping: (v: boolean) => void;

  // Demo mode
  isDemoMode: boolean;
  setIsDemoMode: (v: boolean) => void;
  demoStep: number;
  setDemoStep: (s: number) => void;

  // Last bot question tracker
  lastBotQuestion: string;
  setLastBotQuestion: (q: string) => void;

  // Message count
  messageCount: number;
}

const AstrabonContext = createContext<AstrabonContextType | null>(null);

let msgIdCounter = 0;
function genId() {
  return `msg-${Date.now()}-${msgIdCounter++}`;
}

export function AstrabonProvider({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [flowState, setFlowState] = useState<FlowState>('welcome');
  const [buyerType, setBuyerType] = useState<BuyerType>(null);
  const [productCategory, setProductCategory] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);
  const [leadData, setLeadData] = useState<LeadData>({});
  const [isCapturingLead, setIsCapturingLead] = useState(false);
  const [leadStep, setLeadStep] = useState<'name' | 'businessName' | 'email' | 'phone' | 'done'>('name');
  const [isTyping, setIsTyping] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [lastBotQuestion, setLastBotQuestion] = useState('');

  const addMessage = useCallback((msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const fullMsg: ChatMessage = {
      ...msg,
      id: genId(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setChatHistory(prev => [...prev, fullMsg]);
    if (msg.sender === 'bot') {
      setLastBotQuestion(msg.text);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setChatHistory([]);
    setFlowState('welcome');
    setBuyerType(null);
    setProductCategory(null);
    setPriority(null);
    setLeadData({});
    setIsCapturingLead(false);
    setLeadStep('name');
    setLastBotQuestion('');
    setIsDemoMode(false);
    setDemoStep(0);
  }, []);

  const messageCount = chatHistory.length;

  return (
    <AstrabonContext.Provider value={{
      isExpanded, setIsExpanded,
      chatHistory, addMessage, clearHistory,
      flowState, setFlowState,
      buyerType, setBuyerType,
      productCategory, setProductCategory,
      priority, setPriority,
      leadData, setLeadData,
      isCapturingLead, setIsCapturingLead,
      leadStep, setLeadStep,
      isTyping, setIsTyping,
      isDemoMode, setIsDemoMode,
      demoStep, setDemoStep,
      lastBotQuestion, setLastBotQuestion,
      messageCount,
    }}>
      {children}
    </AstrabonContext.Provider>
  );
}

export function useAstrabon() {
  const ctx = useContext(AstrabonContext);
  if (!ctx) throw new Error('useAstrabon must be used inside AstrabonProvider');
  return ctx;
}
