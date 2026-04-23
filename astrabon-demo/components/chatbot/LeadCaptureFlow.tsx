'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAstrabon } from './AstrabonContext';
import { CheckCircle, Loader2, User, Mail, Phone } from 'lucide-react';

export function LeadCaptureFlow() {
  const { leadData, setLeadData, leadStep, setLeadStep, addMessage, setIsCapturingLead, setFlowState } = useAstrabon();
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const steps = {
    name: { label: 'Your Name', placeholder: 'e.g. Ahmed Hassan', icon: User, hint: 'How should we address you?' },
    email: { label: 'Email Address', placeholder: 'your@email.com', icon: Mail, hint: "We'll send product details here." },
    phone: { label: 'WhatsApp / Phone', placeholder: '+960 xxx xxxx (optional)', icon: Phone, hint: 'For faster follow-up.' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadStep !== 'phone' && !inputValue.trim()) return;

    if (leadStep === 'name') {
      setLeadData({ ...leadData, name: inputValue.trim() });
      addMessage({ sender: 'user', text: inputValue.trim(), type: 'text' });
      addMessage({ sender: 'bot', text: `Thank you, ${inputValue.trim()}! What's your email address so we can send you product details?`, type: 'text' });
      setLeadStep('email');
      setInputValue('');
    } else if (leadStep === 'email') {
      setLeadData({ ...leadData, email: inputValue.trim() });
      addMessage({ sender: 'user', text: inputValue.trim(), type: 'text' });
      addMessage({ sender: 'bot', text: 'Perfect. One last thing — your WhatsApp number (optional, so we can reach you faster):', type: 'text' });
      setLeadStep('phone');
      setInputValue('');
    } else if (leadStep === 'phone') {
      setIsSubmitting(true);
      const phone = inputValue.trim() || 'Not provided';
      setLeadData({ ...leadData, phone });
      addMessage({ sender: 'user', text: phone !== 'Not provided' ? phone : 'Skip', type: 'text' });

      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setLeadStep('done');
        setIsCapturingLead(false);
        setFlowState('complete');
        addMessage({
          sender: 'bot',
          text: `All set! 🎉 The Astrabon team has your details and will reach out within 24 hours with personalized recommendations.\n\nIs there anything else I can help you with in the meantime?`,
          type: 'options',
          options: ['Browse more products', 'Compare materials', 'Ask another question'],
        });
      }, 1200);
    }
  };

  if (submitted || leadStep === 'done') return null;

  const currentStep = steps[leadStep];
  const Icon = currentStep?.icon;
  const stepNumber = leadStep === 'name' ? 1 : leadStep === 'email' ? 2 : 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-4 p-4 rounded-2xl bg-primary/8 border border-primary/20 backdrop-blur-sm"
    >
      {/* Progress */}
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3].map(n => (
          <div
            key={n}
            className={`flex-1 h-1 rounded-full transition-all duration-300 ${n <= stepNumber ? 'bg-primary' : 'bg-border-subtle'}`}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 mb-3">
        {Icon && <Icon className="w-4 h-4 text-primary" />}
        <p className="text-xs text-text-muted">{currentStep.hint}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type={leadStep === 'email' ? 'email' : 'text'}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder={currentStep.placeholder}
          autoFocus
          className="flex-1 bg-surface-alt/60 border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-primary/50 transition-all"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-3 rounded-xl bg-primary text-text-on-primary text-sm font-bold hover:bg-amber-400 transition-all disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : leadStep === 'phone' ? 'Submit' : 'Next →'}
        </button>
      </form>

      {leadStep === 'phone' && (
        <button
          onClick={() => {
            setInputValue('');
            const btn = document.createElement('button');
            document.dispatchEvent(new Event('lead-skip-phone'));
            handleSubmit(new Event('submit') as unknown as React.FormEvent);
          }}
          className="mt-2 text-[11px] text-text-muted hover:text-primary transition-colors w-full text-center"
        >
          Skip phone number →
        </button>
      )}
    </motion.div>
  );
}
