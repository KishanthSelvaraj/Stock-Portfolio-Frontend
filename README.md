
# Stock Portfolio Tracker

This repository contains the **Stock Portfolio Tracker Application**, a fully functional and responsive web application developed using **React** for the frontend and **Spring Boot** for the backend. The application allows users to:

- Add, view, edit, and delete stock holdings.  
- Track the total portfolio value based on real-time stock prices.  
- View a dashboard displaying key portfolio metrics, such as total value, top-performing stock, and portfolio distribution.  

This project is entirely developed by me and does not rely on public sources or prebuilt templates.


## Features

### **Frontend**
- Built using **React** with **Vite** for fast development.  
- A responsive UI hosted on **Vercel**.  
- Includes:
  - A dashboard showing portfolio metrics.  
  - A form to add or edit stock details (e.g., stock name, ticker, quantity, buy price).  
  - A table displaying current stock holdings with options to edit or delete entries.  



### **Backend**
- Developed using **Spring Boot**.  
- RESTful APIs to:
  - Add a new stock.  
  - Update existing stock details.  
  - Delete a stock.  
  - Fetch all stocks and calculate the portfolio value.  
- Integrated with **Alpha Vantage API** for live stock prices (note: Alpha Vantage allows 5 free responses per day).  
- Hosted on **Render**.  



### **Real-Time Data**
- Stock prices are fetched from **Alpha Vantage** to calculate the portfolio value dynamically.  
- For assignment purposes, 5 random stocks are assigned to each user, each with a quantity of 1.  



### **Database**
- **MySQL** database to store stock details:
  - Stock name  
  - Ticker  
  - Quantity  
  - Buy price  



## Deployment Links
- **Frontend**: Hosted on [Vercel](https://stock-portfolio-frontend-sigma.vercel.app/dashboard).  
- **Backend**: Hosted on [Render](https://stock-portfolio-backend-ub88.onrender.com).  



## Installation

### **Frontend**
1. Clone the repository:  
   ```bash
   git clone https://github.com/KishanthSelvaraj/Stock-Portfolio-Frontend.git
   ```
2. Navigate to the project directory:  
   ```bash
   cd Stock-Portfolio-Frontend
   ```
3. Install dependencies:  
   ```bash
   npm install
   ```
4. Run the development server:  
   ```bash
   npm run dev
   ```
5. The application will be accessible at [http://localhost:5173](http://localhost:5173).  



### **Backend**
1. Clone the repository:  
   ```bash
   git clone https://github.com/KishanthSelvaraj/Stock-Portfolio-Backend.git
   ```
2. Navigate to the project directory:  
   ```bash
   cd Stock-Portfolio-Backend
   ```
3. Build the project:  
   ```bash
   ./mvnw clean install
   ```
4. Run the application:  
   ```bash
   ./mvnw spring-boot:run
   ```
5. The backend will be accessible at [http://localhost:8080](http://localhost:8080).  



## Assumptions and Limitations
1. **Alpha Vantage API**:  
   - Allows only 5 free responses per day. Ensure you plan API usage accordingly.  
2. **Stock Quantities**:  
   - Each stock is assigned a quantity of 1 for this assignment.  



## Key Highlights
- Fully developed from scratch without using prebuilt templates.  
- Responsive design and clean code structure.  
- Live stock price integration for dynamic portfolio updates.  



## Contact
For any queries or support, please feel free to contact me.  

Happy Tracking!  

 

