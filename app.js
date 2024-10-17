const express = require('express');
const app = express();
const vodkasRoutes = require('./routes/vodkas');
const winesRoutes = require('./routes/wines');
const whiskiesRoutes = require('./routes/whiskies');
const rumRoutes = require('./routes/rum');

app.use(express.json());

// Routing
app.use('/api/vodkas', vodkasRoutes);
app.use('/api/wines', winesRoutes);
app.use('/api/whiskies', whiskiesRoutes); 
app.use('/api/rum', rumRoutes);  

// Start serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer uruchomiony na porcie ${PORT}`);
});
