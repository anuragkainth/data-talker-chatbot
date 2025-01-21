import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchHelp = async () => {
      try {
        const response = await axios.post('https://data-talker-chatbot.onrender.com/api/chat', { message: 'help' });
  
        if (response.data.products && response.data.products.length > 0) {
          setMessages([
            { text: response.data.message, sender: 'bot' },
            ...response.data.products.map(command => ({ text: command, sender: 'bot' }))
          ]);
        } else {
          setMessages([{ text: response.data.message, sender: 'bot' }]);
        }
      } catch (error) {
        setMessages([{ text: "I'm sorry, I encountered an error fetching help.", sender: 'bot' }]);
      }
    };
  
    fetchHelp();
  }, []); // Runs only once when the app loads

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://data-talker-chatbot.onrender.com/api/chat', {
        message: userMessage
      });

      if (response.data.products && response.data.products.length > 0) {
        setMessages(prev => [
          ...prev,
          { text: response.data.message, sender: 'bot' },
          ...response.data.products.map(product => ({
            text: typeof product === "string"
              ? product
              : `${product.name} - ${product.price}\n${product.description}`,
            sender: 'bot'
          }))
        ]);
      } else {
        setMessages(prev => [...prev, { text: response.data.message, sender: 'bot' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        text: "I'm sorry, I encountered an error. Please try again.",
        sender: 'bot'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">DataTalker 🤖 Chatbot Assistant</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
                }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 rounded-lg p-3">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;