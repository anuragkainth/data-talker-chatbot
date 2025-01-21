import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    // Convert message to lowercase for easier matching
    const query = message.toLowerCase();

    if (query.includes('show all products') || query.includes('list products')) {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) throw error;

      const productList = data.map(p => ({
        name: p.name,
        price: `$${p.price}`,
        description: p.description
      }));
      res.json({ message: "Here are all our products:", products: productList });
    }
    else if (query.includes('search product') || query.includes('find product')) {
      const searchTerm = query.split('product')[1].trim();
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${searchTerm}%`);

      if (error) throw error;

      if (data.length === 0) {
        res.json({ message: `I couldn't find any products matching: "${searchTerm}"`, products: [] });
      } else {
        const productList = data.map(p => ({
          name: p.name,
          price: `$${p.price}`,
          description: p.description
        }));
        res.json({ message: "Here are the products I found:", products: productList });
      }

    }
    else if (query.includes('help')) {
      res.json({
        message: "Here are some commands you can try:",
        products: [
          '• "Show all products"',
          '• "Search product [name] or Find product [name]"',
          '• "Help"'
        ]
      });
    }
    else {
      res.json({
        message: "I'm sorry, I didn't understand that command. Type 'help' to see what I can do!"
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: "I'm sorry, I encountered an error while processing your request."
    });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});