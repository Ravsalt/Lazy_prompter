import { useState, useRef, useEffect } from 'react';
import { Zap, Wand2, Loader2, Sparkles, Copy, Check, Info, AlertTriangle } from 'lucide-react';

// Get prompts from environment variables
const systemPrompt = JSON.parse(import.meta.env.PROMPTS.PROMPT_SYSTEMPROMPT || '{}');
const advancedSystemPrompt = JSON.parse(import.meta.env.PROMPTS.PROMPT_ADVANCEPROMPT || '{}');

const PromptGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const textareaRef = useRef(null);
  const promptRef = useRef(null);
  
  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 300)}px`;
    }
  }, [prompt]);
  
  // Reset copy success state after 2 seconds
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);
  
  // Auto-scroll to generated prompt
  useEffect(() => {
    if (generatedPrompt && promptRef.current) {
      promptRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [generatedPrompt]); // Optional: store result

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    if (error) setError(null);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt before generating');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedPrompt(null);

    let system_prompt = isAdvanced ? advancedSystemPrompt : systemPrompt;
    try {
      const response = await fetch('https://text.pollinations.ai/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: isAdvanced ? 'openai-large' : 'openai',
          messages: [
            { role: 'system', content: system_prompt },
            { role: 'user', content: prompt },
          ],
          temperature: isAdvanced ? 0.7 : 0.5,
          max_tokens: isAdvanced ? 1500 : 1000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to generate prompt');
      }

      const data = await response.json();
      setGeneratedPrompt(data.choices[0].message.content.trim());
    } catch (err) {
      setError(err.message || 'Failed to generate prompt. Please try again.');
      console.error('Error generating prompt:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            Generate perfect AI prompts in seconds
          </h2>
          <p className="text-lg text-gray-600">
            Describe your task and let our AI generate a precise, effective, and easy-to-use prompt
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-700 mb-2">
            Your request
          </label>
          <div className="relative">
            <textarea
              id="prompt-input"
              ref={textareaRef}
              className="w-full p-4 bg-white border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition duration-200 min-h-[120px] max-h-[300px] resize-none shadow-sm text-gray-900"
              placeholder="Describe your task here..."
              value={prompt}
              onChange={handlePromptChange}
              maxLength={1000}
              disabled={isLoading}
              onFocus={() => setError(null)}
            />
            <div className="flex justify-between mt-1">
              <div className="text-xs text-gray-500">
                {prompt.length > 800 && (
                  <span className="flex items-center text-amber-600">
                    <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                    Long prompts may be truncated
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500">
                {prompt.length}/1000 characters
              </div>
            </div>
          </div>
        </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Model</span>
          <div className="flex items-center text-xs text-gray-500">
            <Info className="w-3.5 h-3.5 mr-1" />
            {isAdvanced ? 'Better quality, slower response' : 'Faster response, good for simple tasks'}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => !isLoading && setIsAdvanced(false)}
            disabled={isLoading}
            className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
              !isAdvanced
                ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            } ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'}`}
          >
            <Zap className={`w-6 h-6 mb-2 ${!isAdvanced ? 'text-purple-600' : 'text-gray-400'}`} />
            <span className="font-medium">Fast</span>
            <p className="text-xs text-gray-500">Faster response, good for simple tasks</p>
            {!isAdvanced && (
              <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                Selected
              </div>
            )}
          </button>

          <button
            onClick={() => !isLoading && setIsAdvanced(true)}
            disabled={isLoading}
            className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
              isAdvanced
                ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            } ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'}`}
          >
            <Wand2 className={`w-6 h-6 mb-2 ${isAdvanced ? 'text-purple-600' : 'text-gray-400'}`} />
            <span className="font-medium">Advanced</span>
            <p className="text-xs text-gray-500">Better quality, slower response</p>
            {isAdvanced && (
              <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                Selected
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim()}
          className={`w-full py-3.5 px-6 rounded-xl font-medium text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
            isLoading
              ? 'bg-blue-400 cursor-not-allowed'
              : !prompt.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Crafting your prompt...</span>
            </>
          ) : (
            <>
              <Sparkles className={`w-5 h-5 ${!isHovered ? 'animate-pulse' : ''}`} />
              <span>Generate AI-Powered Prompt</span>
            </>
          )}
        </button>

        {error && (
          <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r">
            <div className="flex items-center text-red-700">
              <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}
      </div>
      {generatedPrompt && (
        <div 
          ref={promptRef}
          className="mt-8 border border-gray-200 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
        >
          <div className="flex justify-between items-center px-5 py-3.5 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <div className="flex items-center">
              <h3 className="font-semibold text-gray-800">Your AI-Generated Prompt</h3>
              <span className="ml-3 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {isAdvanced ? 'Advanced' : 'Fast'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                {Math.ceil(generatedPrompt.length / 4)} tokens
              </span>
              <button
                onClick={handleCopy}
                className={`flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  copySuccess 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
                disabled={copySuccess}
                title={copySuccess ? 'Copied!' : 'Copy to clipboard'}
              >
                {copySuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="relative">
            <pre className="p-5 overflow-x-auto text-sm leading-relaxed text-gray-800 bg-white m-0">
              <code className="font-mono whitespace-pre-wrap break-words">
                {generatedPrompt}
              </code>
            </pre>
            <div className="absolute bottom-3 right-3">
              <div className="flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500">
                  Generated with {isAdvanced ? 'Lazy Prompter' : 'Lazy Prompter'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-500">
          Need help? Try being more specific in your request for better results.
          <br />
        </p>
      </div>
    </div>
  );
};

export default PromptGenerator;
