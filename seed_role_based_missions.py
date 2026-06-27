# seed_role_based_missions.py
# Deletes 3 overused clone missions, adds 11 quality role-based missions
# Run: python seed_role_based_missions.py

import requests
import sys

BASE = "http://localhost:8080"

# ── Login ──────────────────────────────────────────────────────────────
def login():
    r = requests.post(f"{BASE}/api/auth/login",
                      json={"email": "admin@demo.com", "password": "***REMOVED***"},
                      timeout=10)
    if r.status_code != 200:
        print("Login failed:", r.text)
        sys.exit(1)
    token = r.json().get("token") or r.cookies.get("token")
    print("Logged in OK")
    return r.cookies if not token else None, token

# ── Delete ─────────────────────────────────────────────────────────────
DELETE_IDS = [
    ("6a2950f413008c36914d3ade", "Netflix / OTT Streaming UI (clone)"),
    ("6a2950f413008c36914d3adf", "Social Media App - Twitter Clone (clone)"),
    ("6a2950f413008c36914d3ae0", "Food Ordering App - Swiggy Clone (clone)"),
]

# ── New missions ────────────────────────────────────────────────────────
MISSIONS = [

    # ── 1. DATA ANALYST ─────────────────────────────────────────────
    {
        "title": "Netflix Content Analytics & Business Insights Dashboard",
        "missionBrief": (
            "Netflix has 17,000+ titles across 190 countries. "
            "Your job as a Data Analyst is to dig into the Netflix Movies & TV Shows dataset, "
            "uncover what content strategy drives engagement, and present your findings in "
            "an interactive dashboard. This exact type of project — EDA + storytelling + "
            "a live dashboard URL — is what separates hired data analysts from rejected ones."
        ),
        "rank": "B",
        "techStack": ["Python", "Pandas", "Matplotlib", "Seaborn", "Plotly", "Streamlit", "SQL"],
        "estimatedHours": 20,
        "category": "ROLE_BASED",
        "targetRoles": ["Data Analyst", "Business Intelligence Developer", "Data Scientist"],
        "objectives": [
            "Download the Netflix Movies & TV Shows dataset from Kaggle. Load it into Pandas and perform initial inspection — shape, dtypes, null counts, duplicate check",
            "Clean the data: parse 'date_added' to datetime, split 'listed_in' (multi-genre) into individual rows using explode(), handle missing director/cast values",
            "Answer 6 business questions with visualisations: top content-producing countries, genre distribution, content type split (Movies vs TV), content added per year/month trend, rating (age group) breakdown, average movie duration trend by year",
            "Build a SQL layer: load cleaned data into SQLite, write 3 analytical queries that a BI team would actually run (e.g. top directors by title count, genre popularity by country)",
            "Build an interactive Streamlit dashboard with sidebar filters: year range slider, country multiselect, genre multiselect — all charts update dynamically",
            "Add a 'Content Deep Dive' section: user picks any title from a dropdown and sees full details + similar content by genre",
            "Deploy to Streamlit Community Cloud (free) and include the live URL in your README"
        ],
        "bonusObjectives": [
            "Add a word cloud of movie descriptions using wordcloud library — visualise the dominant themes",
            "Build a director/actor co-appearance network using NetworkX and visualise it with Pyvis",
            "Compare Netflix content strategy: pre-2019 vs post-2019 (COVID shifted streaming trends)"
        ],
        "hints": [
            "The 'listed_in' column has comma-separated genres — use: df['genre'] = df['listed_in'].str.split(', ') then df.explode('genre') to get one row per genre",
            "Use pd.to_datetime(df['date_added'], errors='coerce') — the errors flag prevents crashes on messy date strings",
            "In Streamlit, always use @st.cache_data on your data loading function or the app reloads the CSV on every user interaction",
            "Plotly Express (px.bar, px.choropleth, px.sunburst) gives interactive charts with 5x less code than Matplotlib — use it for the dashboard"
        ],
        "approachSteps": [
            "Download dataset: kaggle.com/datasets/shivamb/netflix-shows (no login required with direct download)",
            "Run initial EDA in a Jupyter notebook — understand every column before writing dashboard code",
            "Engineer derived columns: 'year_added' from 'date_added', 'primary_genre' (first genre), 'duration_mins' (parse numeric from 'duration')",
            "Answer each business question in the notebook first, then migrate the working code to Streamlit",
            "Structure the app with st.tabs: Overview | Content Trends | Country Analysis | Deep Dive",
            "Use st.sidebar for all filters — multiselect for country/genre, slider for year range",
            "Push to GitHub with a README that includes: problem statement, dataset source, key insights found, live demo link"
        ],
        "learningOutcome": (
            "You will develop the core Data Analyst workflow: data cleaning, feature engineering, "
            "multi-dimensional EDA, business question framing, and deploying a shareable dashboard. "
            "After this project you can confidently say you have shipped a real analytics product — "
            "and the live URL on your resume proves it."
        ),
        "prerequisites": ["Python Fundamentals", "Pandas & NumPy basics", "Basic data visualisation", "SQL basics"],
        "conceptsCovered": [
            "Exploratory Data Analysis (EDA)", "Data cleaning and feature engineering",
            "Multi-dimensional aggregations", "Plotly interactive visualisations",
            "Streamlit dashboard deployment", "SQLite for analytical queries"
        ],
        "commonMistakes": [
            "Not exploding multi-value columns like 'listed_in' before groupby — you get wrong genre counts",
            "Plotting all 80+ countries without filtering top N — the chart becomes unreadable",
            "Skipping the SQL layer — even if Pandas can do it, demonstrating SQL queries shows broader skills",
            "No README or live URL — a private GitHub repo with no description looks unfinished to recruiters"
        ],
        "subjectIds": [],
        "subjectTitles": [],
        "published": True,
        "orderIndex": 35
    },

    # ── 2. DATA ANALYST ─────────────────────────────────────────────
    {
        "title": "E-Commerce Customer Segmentation & RFM Analysis",
        "missionBrief": (
            "RFM (Recency, Frequency, Monetary) analysis is the most widely used customer segmentation "
            "technique in retail and e-commerce. Used by Amazon, Flipkart, and every growth marketing team. "
            "You will take a real transactional e-commerce dataset, segment customers into actionable groups "
            "(Champions, Loyal, At Risk, Lost), and deliver a business report with Power BI or Tableau. "
            "This project shows you can translate data into marketing strategy — a top-5 skill for any Data Analyst."
        ),
        "rank": "B",
        "techStack": ["Python", "Pandas", "scikit-learn", "SQL", "Power BI or Tableau", "Streamlit"],
        "estimatedHours": 22,
        "category": "ROLE_BASED",
        "targetRoles": ["Data Analyst", "Business Intelligence Developer", "Marketing Analyst", "Data Scientist"],
        "objectives": [
            "Download the Online Retail II dataset from UCI ML Repository (real UK e-commerce, 2009-2011). Inspect it — 1M+ rows, handle cancelled orders (InvoiceNo starts with 'C'), negative quantities, and missing CustomerID",
            "Compute RFM scores for every customer: Recency = days since last purchase, Frequency = total orders, Monetary = total spend. Use quantile-based scoring (1-5 scale)",
            "Assign RFM segment labels: Champions (5,5,5), Loyal Customers, Potential Loyalists, At Risk, Lost. Write the segmentation logic as a clean function",
            "Build a K-Means clustering model on the RFM features (after StandardScaler) — compare cluster assignments to your manual RFM segments",
            "Calculate segment statistics: size, average order value, purchase frequency, revenue contribution per segment",
            "Build an interactive Power BI or Tableau dashboard: customer count per segment, revenue per segment, RFM distribution heatmap, top customers table",
            "Write a 1-page business recommendation: for each segment, what marketing action should the team take?"
        ],
        "bonusObjectives": [
            "Add cohort analysis: track monthly retention rates for the first 12 cohorts — which acquisition months had the best retention?",
            "Build a customer lifetime value (CLTV) prediction model using BG/NBD model (lifetimes library)",
            "Create a Streamlit version of the dashboard as an alternative to Power BI"
        ],
        "hints": [
            "Filter out cancelled orders first: df = df[~df['InvoiceNo'].astype(str).str.startswith('C')] — these inflate your analysis",
            "For Recency, set reference_date = df['InvoiceDate'].max() + timedelta(days=1) so the most recent customer has Recency=1 not 0",
            "Use pd.qcut(df['R_score'], q=5, labels=[5,4,3,2,1]) for Recency (lower days = better score) and pd.qcut with labels=[1,2,3,4,5] for F and M",
            "K-Means needs StandardScaler on RFM features — raw monetary values dominate distance calculations without scaling"
        ],
        "approachSteps": [
            "Download: archive.ics.uci.edu/ml/datasets/Online+Retail+II — load with pd.read_excel()",
            "Clean: drop rows where CustomerID is null, remove cancelled orders, filter Quantity > 0 and UnitPrice > 0",
            "Feature engineering: create 'TotalPrice' = Quantity * UnitPrice, aggregate by CustomerID to get R, F, M values",
            "Score: use pd.qcut to assign 1-5 scores for each RFM dimension, combine into RFM_Score string",
            "Segment: map RFM_Score to segment labels using a dictionary or conditional logic",
            "Cluster: apply KMeans(n_clusters=4) on StandardScaler-transformed RFM, evaluate with silhouette score",
            "Visualise: export cleaned data to CSV, build Power BI dashboard — import, create measures, build report",
            "Write business recommendations as a PDF or README section — this is what makes the project stand out"
        ],
        "learningOutcome": (
            "RFM analysis is used in every company with a customer database. "
            "After this project you will know how to segment customers for marketing campaigns, "
            "validate segments with ML clustering, and communicate findings to non-technical stakeholders. "
            "A Power BI/Tableau dashboard screenshot is the strongest visual you can put in a Data Analyst resume."
        ),
        "prerequisites": ["Python Pandas", "SQL aggregations", "Basic statistics", "Power BI or Tableau basics"],
        "conceptsCovered": [
            "RFM customer segmentation", "K-Means clustering", "StandardScaler normalisation",
            "Cohort analysis", "Business KPI dashboards", "Data storytelling"
        ],
        "commonMistakes": [
            "Including cancelled orders in the analysis — they make Frequency artificially high and Monetary artificially low",
            "Not normalising before K-Means — customers with high spend dominate the distance metric",
            "Creating too many segments (10+) — 4-6 segments is the industry standard for actionability",
            "Skipping the business recommendation section — without it, this is a code exercise, not a business project"
        ],
        "subjectIds": [],
        "subjectTitles": [],
        "published": True,
        "orderIndex": 36
    },

    # ── 3. DATA SCIENCE ─────────────────────────────────────────────
    {
        "title": "Customer Churn Prediction System with Live Dashboard",
        "missionBrief": (
            "Telecom companies lose 15-25% of customers annually to churn — each lost customer costs $200-$400 "
            "to replace. Your mission is to build a complete churn prediction system using real telco data: "
            "EDA to find churn drivers, multiple ML models compared, best model deployed as a live web app "
            "where business teams can input customer data and get instant churn probability. "
            "This is the most commonly requested Data Science project in interviews."
        ),
        "rank": "B",
        "techStack": ["Python", "Pandas", "scikit-learn", "XGBoost", "SHAP", "Streamlit", "FastAPI"],
        "estimatedHours": 25,
        "category": "ROLE_BASED",
        "targetRoles": ["Data Scientist", "Machine Learning Engineer", "Python Developer", "Data Analyst"],
        "objectives": [
            "Load the IBM Telco Customer Churn dataset (Kaggle). Perform full EDA: churn rate, feature distributions by churn status, correlation heatmap, class imbalance check",
            "Encode categorical variables (LabelEncoder or OneHotEncoder), handle TotalCharges conversion to numeric, drop customerID",
            "Train and compare 4 models: Logistic Regression, Random Forest, XGBoost, SVM — use 5-fold cross-validation. Report accuracy, precision, recall, F1, and AUC-ROC for each",
            "Handle class imbalance with SMOTE (imblearn) on training data only — never on test. Measure before/after improvement",
            "Use SHAP to explain the best model: global feature importance plot + local explanation for a single churned customer",
            "Build a Streamlit web app: user fills a form with customer details, app shows churn probability (0-100%) and top 3 reasons why",
            "Add a batch prediction tab: upload a CSV of customers, download predictions. This is what real business users need"
        ],
        "bonusObjectives": [
            "Add a business impact calculator: given a retention campaign cost and churn probability threshold, calculate expected ROI",
            "Build a FastAPI backend and React frontend instead of Streamlit for a more production-like architecture",
            "Add model monitoring: log each prediction to a database, build a chart showing how confidence scores change over time"
        ],
        "hints": [
            "TotalCharges has spaces as missing values — use pd.to_numeric(df['TotalCharges'], errors='coerce') then fill NaN with median",
            "Apply SMOTE only to training data inside the cross-validation loop — applying it to the full dataset causes data leakage",
            "XGBoost often wins on tabular data with minimal tuning: use scale_pos_weight = negative_count/positive_count for imbalance",
            "For the SHAP summary plot: shap.summary_plot(shap_values, X_test, feature_names=feature_names) — saves as a matplotlib figure you can embed in Streamlit"
        ],
        "approachSteps": [
            "Download IBM Telco Customer Churn from Kaggle — it is a classic and widely recognised in interviews",
            "EDA first: plot churn vs each feature using seaborn countplot/boxplot. Find the 5 most predictive features before modelling",
            "Preprocessing pipeline using sklearn Pipeline + ColumnTransformer — this keeps your code clean and prevents leakage",
            "Train all 4 models with the same train/test split. Print a comparison table. Choose winner by AUC-ROC on test set",
            "SHAP: shap.Explainer(best_model, X_train) — generate values for test set, plot global importance and one local explanation",
            "Streamlit app: st.form with all input fields matching the dataset features, display probability as st.progress() + st.metric()",
            "Deploy to Streamlit Community Cloud — add the live URL to GitHub README prominently"
        ],
        "learningOutcome": (
            "You will complete the full Data Science workflow: problem framing, EDA, feature engineering, "
            "model comparison, handling class imbalance, model explainability, and production deployment. "
            "SHAP explainability is a critical skill — it is what makes ML models trusted by business teams, "
            "and it is increasingly asked about in Data Science interviews."
        ),
        "prerequisites": ["Python Pandas & NumPy", "scikit-learn basics", "Basic statistics (precision/recall/AUC)"],
        "conceptsCovered": [
            "Binary classification", "Cross-validation", "Class imbalance (SMOTE)",
            "XGBoost", "SHAP model explainability", "scikit-learn Pipeline", "Streamlit deployment"
        ],
        "commonMistakes": [
            "Applying SMOTE before train/test split — this leaks synthetic minority samples into the test set and inflates metrics",
            "Only reporting accuracy — churn datasets are imbalanced, accuracy is misleading. Always report AUC-ROC and F1",
            "Not using a Pipeline for preprocessing — manually transforming train and test separately causes subtle leakage bugs",
            "Skipping SHAP — without explainability, a business team will not trust or use your model"
        ],
        "subjectIds": [],
        "subjectTitles": [],
        "published": True,
        "orderIndex": 37
    },

    # ── 4. DATA ANALYST ─────────────────────────────────────────────
    {
        "title": "Financial Stock Market Analysis & Portfolio Risk Tracker",
        "missionBrief": (
            "Every investment bank, hedge fund, and fintech startup needs analysts who can pull real market data, "
            "calculate risk metrics, and visualise portfolio performance. "
            "Build a live stock analysis tool that fetches real-time data from Yahoo Finance, computes "
            "industry-standard risk metrics (Sharpe Ratio, Value at Risk, drawdown), and presents "
            "everything in a clean interactive dashboard. No paid APIs needed — yfinance is free."
        ),
        "rank": "B",
        "techStack": ["Python", "yfinance", "Pandas", "NumPy", "Plotly", "Streamlit"],
        "estimatedHours": 18,
        "category": "ROLE_BASED",
        "targetRoles": ["Data Analyst", "Financial Analyst", "Data Scientist", "Python Developer"],
        "objectives": [
            "Fetch 3 years of daily OHLCV data for 5+ stocks using yfinance. Calculate daily and cumulative returns",
            "Build a candlestick chart with 50-day and 200-day moving averages for any selected stock",
            "Calculate portfolio returns given user-defined weights. Compare against a benchmark (Nifty 50 / S&P 500)",
            "Compute risk metrics: Annualised Volatility, Sharpe Ratio, Max Drawdown, Value at Risk (VaR at 95% confidence)",
            "Build a correlation heatmap of selected stocks — useful for portfolio diversification decisions",
            "Monte Carlo simulation: simulate 1000 portfolio paths over the next 252 trading days, show confidence interval",
            "Interactive Streamlit app: user picks stocks by ticker, sets portfolio weights, sees all metrics update live"
        ],
        "bonusObjectives": [
            "Add Efficient Frontier optimisation using scipy.optimize — show the maximum Sharpe Ratio portfolio",
            "Add technical indicators: RSI (14-day), MACD, Bollinger Bands using the ta library",
            "Add news sentiment: fetch recent headlines for each stock using NewsAPI and score them with VADER"
        ],
        "hints": [
            "yfinance download: yf.download(['RELIANCE.NS', 'TCS.NS'], start='2021-01-01', end='2024-01-01')['Adj Close']",
            "Daily returns: returns = prices.pct_change().dropna(). Annualised volatility: returns.std() * np.sqrt(252)",
            "Sharpe Ratio: (portfolio_return - risk_free_rate) / portfolio_volatility — use 0.065 as India risk-free rate (6.5% FD)",
            "VaR at 95%: np.percentile(daily_returns, 5) — this gives the loss you will NOT exceed 95% of the time"
        ],
        "approachSteps": [
            "Start with a single stock — fetch data, plot closing price, calculate returns. Get this working before adding more",
            "Add multiple stocks. Build a price normalisation chart (all start at 100) to compare performance visually",
            "Calculate portfolio returns as weighted sum of individual stock returns",
            "Add risk metrics one by one — verify each manually before adding to the app",
            "Monte Carlo: simulate 1000 random weight portfolios, plot return vs risk scatter, highlight max Sharpe portfolio",
            "Build Streamlit app with st.multiselect for stocks, sliders for portfolio weights (ensure they sum to 1)",
            "Add PDF export of the portfolio report using reportlab or pdfkit"
        ],
        "learningOutcome": (
            "You will learn financial data analysis, time series manipulation, quantitative risk metrics, "
            "and Monte Carlo simulation — skills used daily in fintech, banking, and investment firms. "
            "This project is highly memorable in interviews because it uses live data and produces visually impressive results."
        ),
        "prerequisites": ["Python NumPy & Pandas", "Basic statistics (mean, std dev)", "Basic Plotly or Matplotlib"],
        "conceptsCovered": [
            "Time series analysis", "Financial risk metrics (Sharpe, VaR, drawdown)",
            "Portfolio optimisation basics", "Monte Carlo simulation",
            "Correlation analysis", "Real-time API data fetching"
        ],
        "commonMistakes": [
            "Using price levels instead of returns for correlation — two stocks can both go up without being correlated",
            "Not annualising volatility — daily std dev is ~16x smaller than annualised, making risk look tiny",
            "Hardcoding stock tickers — the app should let users input any valid ticker to be genuinely useful",
            "Not handling API failures — yfinance sometimes fails; always add try/except around data fetching"
        ],
        "subjectIds": [],
        "subjectTitles": [],
        "published": True,
        "orderIndex": 56
    },

    # ── 5. DATA SCIENCE ─────────────────────────────────────────────
    {
        "title": "Credit Card Fraud Detection with Model Explainability",
        "missionBrief": (
            "Global credit card fraud costs $32 billion annually. Every bank and payment processor (Visa, Mastercard, Razorpay) "
            "runs fraud detection ML models in real-time on every transaction. "
            "This mission uses the most popular ML dataset on Kaggle — 284,807 real (anonymised) transactions "
            "with 492 fraudulent ones. The challenge: extreme class imbalance (0.17% fraud). "
            "Your model must catch fraud without flagging too many legitimate transactions — the false positive cost is real."
        ),
        "rank": "A",
        "techStack": ["Python", "Pandas", "scikit-learn", "XGBoost", "imbalanced-learn", "SHAP", "FastAPI", "Streamlit"],
        "estimatedHours": 28,
        "category": "ROLE_BASED",
        "targetRoles": ["Data Scientist", "Machine Learning Engineer", "AI/ML Engineer"],
        "objectives": [
            "Load the Kaggle Credit Card Fraud dataset. Analyse class distribution, feature distributions, and the anonymised PCA features (V1-V28). Note: 'Amount' and 'Time' are the only non-PCA features",
            "Scale 'Amount' with RobustScaler (resistant to outliers). Plot fraud vs non-fraud transaction amount distributions",
            "Try 3 approaches to class imbalance: class_weight='balanced', SMOTE oversampling, and ADASYN. Compare their effect on recall and precision",
            "Train Logistic Regression, Random Forest, and XGBoost. Evaluate with Precision-Recall curve (not ROC — class imbalance makes ROC misleading here). Report Average Precision score",
            "Tune threshold: at default 0.5, a fraud model often misses many frauds. Plot precision-recall tradeoff at different thresholds and choose the optimal one for the business use case",
            "SHAP: explain why specific transactions were flagged as fraud. Show waterfall plot for 1 true positive and 1 false positive",
            "Deploy as a FastAPI endpoint: POST /predict accepts a transaction JSON, returns fraud probability and top 3 suspicious features"
        ],
        "bonusObjectives": [
            "Add Isolation Forest as an unsupervised baseline — how does it compare to supervised models?",
            "Implement a streaming simulation: process transactions one by one from a CSV, log flagged ones in real-time to a database",
            "Add a business cost matrix: false negatives (missed fraud) cost $200, false positives (wrongly declined card) cost $15 — optimise for minimum total cost"
        ],
        "hints": [
            "Never use accuracy as your metric — predicting 'not fraud' for everything gives 99.83% accuracy and is useless",
            "The Kaggle dataset download link: kaggle.com/datasets/mlg-ulb/creditcardfraud — download creditcard.csv (143MB)",
            "For SMOTE: from imblearn.over_sampling import SMOTE. Apply ONLY to training data — X_res, y_res = SMOTE().fit_resample(X_train, y_train)",
            "XGBoost with scale_pos_weight=neg_count/pos_count is often the best single approach for this dataset — try it before SMOTE"
        ],
        "approachSteps": [
            "EDA: plot class distribution, overlay fraud vs normal transaction amounts, check if Time has any fraud pattern",
            "Baseline: train Logistic Regression on raw data with class_weight='balanced'. Record Average Precision as your floor",
            "Try SMOTE: apply to training set, retrain. Did precision-recall improve? Apply ADASYN. Compare all three imbalance strategies",
            "XGBoost with scale_pos_weight: calculate the ratio, train, evaluate. This usually outperforms SMOTE on this dataset",
            "Threshold tuning: model.predict_proba gives probabilities. Loop threshold from 0.1 to 0.9, plot precision and recall. Pick threshold that maximises F1 or minimises business cost",
            "SHAP: train final model on full training set. Generate SHAP values for test set. Plot summary + waterfall for specific transactions",
            "FastAPI: /predict endpoint. Input: dict with all 30 features. Output: {probability: 0.87, is_fraud: true, top_features: [...]}"
        ],
        "learningOutcome": (
            "You will master handling extreme class imbalance — the most common real challenge in ML projects. "
            "SHAP explainability, precision-recall analysis, and threshold tuning are all standard Data Science interview topics. "
            "This dataset is so well-known that interviewers will immediately recognise you know what you are doing."
        ),
        "prerequisites": ["Python Pandas & NumPy", "scikit-learn (classification)", "Basic statistics"],
        "conceptsCovered": [
            "Extreme class imbalance", "SMOTE and ADASYN oversampling", "Precision-Recall curves",
            "XGBoost", "SHAP feature importance", "Threshold tuning", "FastAPI model serving"
        ],
        "commonMistakes": [
            "Using ROC-AUC as the primary metric — with 0.17% fraud rate, any model looks great on ROC. Use Precision-Recall AUC",
            "Applying SMOTE before train/test split — synthetic fraud samples will appear in the test set, inflating all metrics",
            "Not tuning the decision threshold — the default 0.5 is almost never optimal for imbalanced problems",
            "Ignoring false positives — in production, blocking legitimate transactions damages customer trust. Both errors have real costs"
        ],
        "subjectIds": [],
        "subjectTitles": [],
        "published": True,
        "orderIndex": 57
    },

    # ── 6. DATA SCIENCE ─────────────────────────────────────────────
    {
        "title": "Product Review Sentiment Analysis API with Topic Modelling",
        "missionBrief": (
            "Every e-commerce company (Amazon, Flipkart, Myntra) processes millions of product reviews daily. "
            "Manual reading is impossible — they use NLP pipelines to extract sentiment and topics automatically. "
            "Build a complete NLP product: fine-tune a pre-trained transformer for sentiment, extract topic clusters "
            "from reviews, and serve predictions via a FastAPI endpoint with a React/Streamlit frontend. "
            "NLP + deployment in one project is extremely valued in Data Science and AI engineering roles."
        ),
        "rank": "B",
        "techStack": ["Python", "HuggingFace Transformers", "NLTK", "scikit-learn", "FastAPI", "Streamlit", "React (optional)"],
        "estimatedHours": 24,
        "category": "ROLE_BASED",
        "targetRoles": ["Data Scientist", "AI/ML Engineer", "NLP Engineer", "Python Developer"],
        "objectives": [
            "Download the Amazon Product Reviews dataset (Electronics category, ~50K reviews) from Kaggle. Inspect rating distribution, review length, and class balance",
            "Text preprocessing pipeline: lowercase, remove HTML tags, remove punctuation, tokenise, remove stopwords, lemmatise using NLTK. Write it as a reusable function",
            "Baseline model: TF-IDF + Logistic Regression. Report accuracy, F1, and confusion matrix on test set",
            "Fine-tune a pre-trained model: use DistilBERT (distilbert-base-uncased-finetuned-sst-2-english) from HuggingFace for zero-shot inference first, then fine-tune on your dataset for 2 epochs using Trainer API",
            "Compare Logistic Regression vs fine-tuned DistilBERT. Measure accuracy, F1, and inference time per sample",
            "Topic modelling with LDA (Latent Dirichlet Allocation): extract 5 topics from negative reviews. What do customers complain about most?",
            "FastAPI backend: POST /analyse accepts {'review': '...'} returns {'sentiment': 'positive', 'confidence': 0.94, 'topics': [...]}. Build a Streamlit or React frontend to consume it"
        ],
        "bonusObjectives": [
            "Add aspect-based sentiment: instead of overall positive/negative, detect sentiment for specific aspects (battery, display, price)",
            "Build a real-time dashboard showing sentiment trends for a product over time (use the review date column)",
            "Add multilingual support using mBERT or XLM-RoBERTa for Hindi/Tamil reviews"
        ],
        "hints": [
            "For HuggingFace fine-tuning, use Google Colab (free GPU) — DistilBERT fine-tuning takes ~20 minutes on T4",
            "TF-IDF + Logistic Regression with 50K reviews often hits 88-91% accuracy — set this as your baseline before reaching for transformers",
            "LDA topic modelling: from sklearn.decomposition import LatentDirichletAllocation. Fit on TF-IDF matrix, print top 10 words per topic",
            "For the API, load the model once at startup using a global variable — do NOT reload it on every request or it will be very slow"
        ],
        "approachSteps": [
            "Download dataset. Create a binary sentiment label: ratings 4-5 = positive, 1-2 = negative, drop 3-star reviews (neutral)",
            "Build the text preprocessing pipeline. Verify it works on 10 sample reviews before running on full dataset",
            "Train TF-IDF + LogReg baseline. This is your minimum bar — anything below 85% means your preprocessing needs work",
            "HuggingFace zero-shot: test DistilBERT without fine-tuning first. Note accuracy. This shows the value of fine-tuning",
            "Fine-tune on your dataset. Use Trainer with TrainingArguments(num_train_epochs=2, per_device_train_batch_size=16)",
            "LDA: filter to only 1-star reviews, fit LDA(n_components=5). Print top words per topic — what are the main complaint themes?",
            "FastAPI: two endpoints — /analyse (single review) and /batch (list of reviews). Streamlit app: text input + results display"
        ],
        "learningOutcome": (
            "You will go from raw text to a deployed NLP API — the exact pipeline used in production at every major e-commerce company. "
            "HuggingFace fine-tuning is the most in-demand NLP skill right now. "
            "Topic modelling adds the business insight layer that makes this more than just a classification exercise."
        ),
        "prerequisites": ["Python basics", "Basic ML with scikit-learn", "Understanding of text tokenisation"],
        "conceptsCovered": [
            "Text preprocessing pipeline", "TF-IDF vectorisation", "Transformer fine-tuning (HuggingFace)",
            "LDA topic modelling", "FastAPI serving", "Model comparison and evaluation"
        ],
        "commonMistakes": [
            "Including 3-star reviews as negative — 3-star is neutral, not negative. Binary classification is cleaner",
            "Not loading the model at startup — loading a 256MB transformer model inside a request handler makes every call take 5+ seconds",
            "Not filtering stopwords before LDA — topics like 'the', 'is', 'a' dominate and give useless results",
            "Comparing transformer accuracy to TF-IDF without accounting for inference speed — transformers are 100x slower, which matters in production"
        ],
        "subjectIds": [],
        "subjectTitles": [],
        "published": True,
        "orderIndex": 58
    },

    # ── 7. AI/ML ENGINEER ───────────────────────────────────────────
    {
        "title": "RAG-based PDF Document Q&A System",
        "missionBrief": (
            "Retrieval-Augmented Generation (RAG) is the most important AI architecture of 2024-25. "
            "Every enterprise AI project — legal document analysis, HR policy search, customer support bots — "
            "is built on RAG. Build a system where users upload any PDF (textbook, research paper, company policy) "
            "and ask natural language questions. The system retrieves relevant chunks and generates accurate answers. "
            "No hallucinations — every answer is grounded in the document. This is the #1 AI portfolio project."
        ),
        "rank": "A",
        "techStack": ["Python", "LangChain", "ChromaDB", "HuggingFace Transformers", "sentence-transformers", "Streamlit", "FastAPI"],
        "estimatedHours": 30,
        "category": "ROLE_BASED",
        "targetRoles": ["AI/ML Engineer", "LLM Engineer", "Full Stack AI Developer", "Python Developer"],
        "objectives": [
            "Build a PDF ingestion pipeline: extract text using PyPDF2 or pdfplumber, chunk text into 500-token overlapping segments using LangChain RecursiveCharacterTextSplitter",
            "Generate embeddings for each chunk using sentence-transformers (all-MiniLM-L6-v2 — free, no API key). Store in ChromaDB vector store",
            "Implement similarity search: given a user query, embed it and retrieve top 5 most relevant chunks from ChromaDB",
            "Build the generation step: pass retrieved chunks + user question to an LLM. Use either OpenAI GPT-3.5 (if API key available) or HuggingFace inference API (free tier) or Ollama (local, free)",
            "Implement conversation memory: the chatbot should remember previous questions in the same session using LangChain ConversationBufferMemory",
            "Build a Streamlit UI: file uploader (multiple PDFs), chat interface, show source document chunks used for each answer",
            "Add a confidence indicator: show which chunks were retrieved and their similarity scores. Users should know when the system is uncertain"
        ],
        "bonusObjectives": [
            "Add support for web URLs: user pastes a URL, system scrapes the page and adds it to the knowledge base",
            "Add re-ranking: use a cross-encoder model to rerank the top 10 retrieved chunks before passing to the LLM",
            "Deploy with FastAPI backend + React frontend and host the vector database on a cloud provider"
        ],
        "hints": [
            "Use chunk_size=500 and chunk_overlap=50 as starting values for RecursiveCharacterTextSplitter — too small loses context, too large increases cost",
            "sentence-transformers all-MiniLM-L6-v2 is 80MB, free to use, and gives 90% of GPT-4 embedding quality for retrieval tasks",
            "ChromaDB runs in-memory by default — use chromadb.PersistentClient(path='./chroma_db') to save embeddings to disk so you do not re-embed on restart",
            "If you do not have an OpenAI key, use HuggingFace Inference API (mistralai/Mistral-7B-Instruct-v0.1) — it is free with rate limits"
        ],
        "approachSteps": [
            "Build PDF → text extraction first. Test with a 10-page PDF. Make sure tables and headings are captured",
            "Chunking: split extracted text, print first 5 chunks to verify overlap is working correctly",
            "Embeddings: embed the chunks, verify by checking that similar chunks have high cosine similarity",
            "Vector store: insert all chunks + metadata (source file, page number) into ChromaDB",
            "Retrieval: given a test question, retrieve top 5 chunks. Manually verify the retrieved chunks actually answer the question",
            "Generation: connect to LLM API. Build the prompt: system message + retrieved context + user question",
            "Streamlit: st.file_uploader, process on upload, st.chat_input for questions, show sources in an expander below each answer"
        ],
        "learningOutcome": (
            "RAG is the architecture behind ChatGPT plugins, enterprise AI assistants, and most LLM products in production. "
            "You will understand embedding models, vector databases, chunk retrieval, and LLM prompt engineering end-to-end. "
            "This project demonstrates LLM engineering skills that are currently among the highest-paid skills in tech."
        ),
        "prerequisites": ["Python basics", "Basic API calls (requests)", "Understanding of what an LLM is"],
        "conceptsCovered": [
            "Document chunking strategies", "Text embeddings", "Vector similarity search",
            "ChromaDB vector store", "LangChain LCEL", "Prompt engineering", "Conversation memory"
        ],
        "commonMistakes": [
            "Using fixed-size chunking that splits mid-sentence — always use RecursiveCharacterTextSplitter which splits at paragraph > sentence > word boundaries",
            "Not persisting the ChromaDB — re-embedding a 100-page PDF on every app restart makes development very slow",
            "Passing too many retrieved chunks to the LLM — more context is not always better. 3-5 relevant chunks usually outperform 10 mediocre chunks",
            "Not showing sources to the user — without source attribution, users cannot verify answers and will not trust the system"
        ],
        "subjectIds": [],
        "subjectTitles": [],
        "published": True,
        "orderIndex": 59
    },

    # ── 8. AI/ML ENGINEER ───────────────────────────────────────────
    {
        "title": "AI-Powered Resume Analyzer & Job Description Matcher",
        "missionBrief": (
            "HR teams receive 200+ resumes per job posting. ATS (Applicant Tracking System) software "
            "filters most of them automatically. Build the tool from the other side: "
            "an AI system that parses any resume PDF, extracts skills and experience, "
            "compares them against a job description, scores the match, and generates personalised "
            "improvement suggestions. This is a real product that students, recruiters, and career coaches use. "
            "Building it shows you understand NLP, embeddings, and real-world AI product design."
        ),
        "rank": "A",
        "techStack": ["Python", "pdfplumber", "spaCy", "sentence-transformers", "FastAPI", "React", "PostgreSQL"],
        "estimatedHours": 32,
        "category": "ROLE_BASED",
        "targetRoles": ["AI/ML Engineer", "Full Stack AI Developer", "Python Developer", "NLP Engineer"],
        "objectives": [
            "PDF text extraction: use pdfplumber to extract clean text from resumes. Handle multi-column layouts and parse sections (Education, Experience, Skills, Projects)",
            "Named Entity Recognition with spaCy: extract person name, email, phone, degree, institution, years of experience, and technical skills",
            "Skills extraction: maintain a skills taxonomy (500+ tech skills list). Match skills mentioned in resume against the taxonomy using fuzzy matching",
            "Semantic similarity: embed resume text and job description using sentence-transformers (all-mpnet-base-v2). Calculate cosine similarity score (0-100%)",
            "Gap analysis: compare required skills in JD vs skills found in resume. Generate a structured list of missing skills",
            "AI suggestions: given the gap list, generate targeted improvement suggestions using an LLM (HuggingFace free API)",
            "Full-stack app: React frontend for upload + job description input, FastAPI backend, PostgreSQL to store analysis history"
        ],
        "bonusObjectives": [
            "Add ATS simulation: score the resume against common ATS filters (keyword density, file format, section headings)",
            "Build a resume rewrite feature: suggest specific bullet point rewrites using the STAR method",
            "Add multi-resume comparison: upload 5 resumes for one JD and rank them"
        ],
        "hints": [
            "pdfplumber is more accurate than PyPDF2 for text extraction, especially for formatted resumes: import pdfplumber; with pdfplumber.open(file) as pdf: text = ' '.join(p.extract_text() for p in pdf.pages)",
            "For skills extraction, use a pre-built skills taxonomy: github.com/AndrewMacatangay/Tech-Skills-List has 1200+ tech skills as a JSON file",
            "sentence-transformers cosine similarity: from sklearn.metrics.pairwise import cosine_similarity — cosine_similarity(resume_embedding, jd_embedding)[0][0]",
            "spaCy NER is trained on general text, not resumes — use it as a starting point but add custom patterns using spaCy's PhraseMatcher for technical skills"
        ],
        "approachSteps": [
            "Start with PDF extraction only. Test with 5 different resume formats (single column, two column, with tables). pdfplumber handles most layouts well",
            "Build the skills extractor as a standalone module. Test it on 10 resumes manually — precision should be >90%",
            "Build the semantic similarity scorer. Test: a software engineer resume vs software engineer JD should score >70%. Same resume vs data scientist JD should score <50%",
            "Build gap analysis as a set difference between required skills (extracted from JD) and candidate skills",
            "FastAPI: /analyse endpoint accepts resume file + JD text, returns structured JSON with all analysis",
            "React frontend: drag-and-drop resume upload, textarea for JD, animated score display (circular progress), skill gap chips",
            "PostgreSQL: store all analyses for history view. User can see their improvement over multiple submissions"
        ],
        "learningOutcome": (
            "This project combines PDF parsing, NLP entity extraction, semantic embeddings, LLM integration, "
            "and full-stack development — it demonstrates breadth across the entire AI engineering stack. "
            "The product is something you can actually use yourself and share with others, "
            "making it one of the most memorable portfolio projects possible."
        ),
        "prerequisites": ["Python basics", "REST API basics", "React basics (for frontend)", "SQL basics"],
        "conceptsCovered": [
            "PDF text extraction", "Named Entity Recognition (spaCy)", "Semantic similarity (sentence-transformers)",
            "Skills taxonomy matching", "LLM text generation", "FastAPI", "React full-stack integration"
        ],
        "commonMistakes": [
            "Using only keyword matching instead of semantic similarity — 'machine learning' and 'ML' will not match with exact string comparison",
            "Trusting PDF extraction 100% without manual verification — some resumes use image-based text that extraction misses entirely",
            "Building the frontend before the backend is solid — get the API working and tested first, then build UI on top",
            "Not handling the cold-start problem: what to show when the model has not seen a particular skill format before"
        ],
        "subjectIds": [],
        "subjectTitles": [],
        "published": True,
        "orderIndex": 60
    },

    # ── 9. ML ENGINEER ──────────────────────────────────────────────
    {
        "title": "End-to-End ML Pipeline with Experiment Tracking & CI/CD",
        "missionBrief": (
            "The gap between a Data Scientist who trains models in notebooks and an ML Engineer who ships models "
            "to production is MLOps. Companies like Swiggy, Zomato, PhonePe, and every AI startup need engineers "
            "who can build reproducible, versioned, monitored ML pipelines. "
            "Build a complete MLOps pipeline from raw data to deployed model: "
            "DVC for data versioning, MLflow for experiment tracking, Docker for packaging, "
            "and GitHub Actions for automated retraining. This project alone can get you into ML Engineering roles."
        ),
        "rank": "A",
        "techStack": ["Python", "MLflow", "DVC", "scikit-learn", "Docker", "GitHub Actions", "FastAPI", "PostgreSQL"],
        "estimatedHours": 35,
        "category": "ROLE_BASED",
        "targetRoles": ["Machine Learning Engineer", "MLOps Engineer", "AI Infrastructure Engineer", "Data Scientist"],
        "objectives": [
            "Set up DVC for data versioning: track your training dataset in DVC, push to remote storage (DagsHub is free). Any dataset change is now versioned like code",
            "MLflow experiment tracking: wrap your training script with mlflow.start_run(). Log all hyperparameters, metrics (accuracy, F1, AUC), and artifacts (model file, confusion matrix) automatically",
            "Build a reproducible training pipeline with DVC stages (dvc.yaml): data preprocessing stage → feature engineering stage → training stage → evaluation stage. Run entire pipeline with dvc repro",
            "Train 3 model variants and log all to MLflow. Use MLflow Model Registry to promote the best model to 'Production' stage",
            "Docker: write a Dockerfile for the inference service. The container should load the production model from MLflow registry on startup",
            "FastAPI inference service: /predict endpoint, /health endpoint, /model-info endpoint (returns current model version and metrics)",
            "GitHub Actions CI/CD: on every push to main, run automated tests, retrain model if data changed (dvc status), deploy new Docker image if model improved"
        ],
        "bonusObjectives": [
            "Add model monitoring with Evidently: detect data drift and model performance degradation on a weekly batch",
            "Add Prefect or Airflow for workflow orchestration — schedule automated weekly retraining",
            "Set up a staging environment: every PR deploys to staging, manual approval gates production deployment"
        ],
        "hints": [
            "DagsHub (dagshub.com) is the easiest free MLflow + DVC remote — sign up, create a repo, and DagsHub gives you a free MLflow tracking server and DVC remote in one",
            "MLflow autolog: mlflow.sklearn.autolog() automatically logs all scikit-learn model parameters and metrics — add it before model.fit()",
            "For Docker, use python:3.10-slim as base image — it is much smaller than python:3.10 (50MB vs 900MB)",
            "GitHub Actions: use actions/checkout, actions/setup-python, and cache pip packages to keep CI runs fast"
        ],
        "approachSteps": [
            "Project structure: data/, src/preprocess.py, src/train.py, src/evaluate.py, models/, Dockerfile, .github/workflows/",
            "DVC init: dvc init, dvc add data/train.csv, git add, git commit — data is now versioned",
            "MLflow tracking: instrument src/train.py with mlflow.log_param(), mlflow.log_metric(), mlflow.sklearn.log_model()",
            "DVC pipeline: define stages in dvc.yaml. Each stage has cmd, deps (inputs), and outs (outputs). dvc repro runs the full pipeline",
            "Model Registry: after training, use mlflow.register_model() and programmatically promote best model to Production",
            "Dockerfile: COPY requirements.txt, RUN pip install, COPY src/, CMD ['uvicorn', 'main:app']",
            "GitHub Actions workflow: trigger on push, checkout code, run dvc repro, run pytest, build Docker image, push to DockerHub/GHCR"
        ],
        "learningOutcome": (
            "MLOps is one of the highest-paying specialisations in ML — demand far exceeds supply. "
            "You will understand the complete production ML lifecycle: versioning, experimentation, reproducibility, containerisation, and CI/CD. "
            "A GitHub repo showing a complete MLOps pipeline with a DagsHub MLflow dashboard is genuinely impressive and uncommon at entry level."
        ),
        "prerequisites": ["Python ML with scikit-learn", "Basic Git", "Basic command line", "Docker basics"],
        "conceptsCovered": [
            "DVC data versioning", "MLflow experiment tracking and model registry",
            "Pipeline reproducibility", "Docker containerisation",
            "GitHub Actions CI/CD", "FastAPI model serving", "MLOps lifecycle"
        ],
        "commonMistakes": [
            "Tracking experiments manually in a spreadsheet instead of MLflow — you will lose track of which run used which parameters",
            "Not using DVC stages — running scripts manually breaks reproducibility. Anyone should be able to reproduce your results with one command",
            "Building a giant monolithic training script instead of separate pipeline stages — debugging and rerunning individual stages becomes impossible",
            "Not tagging Docker images with the model version — you lose the ability to roll back to a previous model version"
        ],
        "subjectIds": [],
        "subjectTitles": [],
        "published": True,
        "orderIndex": 61
    },

    # ── 10. ML ENGINEER ─────────────────────────────────────────────
    {
        "title": "Production ML Microservice with FastAPI, Docker & Monitoring",
        "missionBrief": (
            "Training a model in Jupyter is step 1. Getting it into production where real users can call it via an API "
            "is what ML Engineers are actually hired to do. "
            "Build a complete production-grade ML service: train a model, wrap it in FastAPI with proper validation, "
            "containerise with Docker, deploy on Render for free, and add basic monitoring so you know when it breaks. "
            "This project is achievable in a week and gives you a live API URL — the strongest resume proof possible."
        ),
        "rank": "B",
        "techStack": ["Python", "FastAPI", "scikit-learn or PyTorch", "Docker", "Pydantic", "Render", "PostgreSQL"],
        "estimatedHours": 22,
        "category": "ROLE_BASED",
        "targetRoles": ["Machine Learning Engineer", "Python Backend Developer", "MLOps Engineer", "AI/ML Engineer"],
        "objectives": [
            "Train a classification model (use any tabular Kaggle dataset — Titanic survival, iris classification, house price bins). Save the trained model with joblib/pickle",
            "FastAPI application: /predict endpoint with Pydantic input validation, /health endpoint returning model version and uptime, /metrics endpoint for monitoring",
            "Input validation with Pydantic: define a strict schema for model inputs. Invalid requests should return 422 with clear error messages",
            "Request logging: log every prediction to PostgreSQL — timestamp, input features, prediction, confidence score. This is the foundation of model monitoring",
            "Docker: write Dockerfile, docker-compose.yml (app + PostgreSQL). Test locally: docker-compose up should give you a working API",
            "Deploy to Render: push Docker image to DockerHub, configure Render Web Service to use it. Set environment variables for DB connection",
            "Monitoring dashboard: simple Streamlit app that queries your prediction logs — shows prediction distribution, confidence histogram, request volume over time"
        ],
        "bonusObjectives": [
            "Add model versioning: when you retrain and get a better model, deploy v2 alongside v1. Route 10% of traffic to v2 (A/B test)",
            "Add Prometheus metrics (prometheus-fastapi-instrumentator) and a Grafana dashboard",
            "Add rate limiting: no client should exceed 100 requests/minute to prevent abuse"
        ],
        "hints": [
            "Use joblib.dump(model, 'model.pkl') to save, joblib.load('model.pkl') to load. Load the model once at startup as a module-level variable",
            "Pydantic BaseModel example: class PredictRequest(BaseModel): age: float = Field(gt=0, lt=150); fare: float = Field(ge=0) — Field adds validation constraints",
            "docker-compose.yml: define two services — 'app' and 'db' (postgres:15). App should depend_on: db and use DATABASE_URL env var",
            "For Render free tier, use an external PostgreSQL (Neon free tier) instead of Render PostgreSQL — Render free DB expires in 90 days"
        ],
        "approachSteps": [
            "Train model, evaluate it, save with joblib. Keep training code in a separate train.py — never mix training and serving code",
            "FastAPI: create app.py with lifespan event that loads model on startup. Define Pydantic schema for inputs",
            "Add /health, /predict, /metrics endpoints. Test locally with curl or the auto-generated Swagger UI at /docs",
            "PostgreSQL logging: use asyncpg or psycopg2. Create predictions table with (id, timestamp, input_json, prediction, confidence)",
            "Docker: Dockerfile FROM python:3.10-slim, COPY, RUN pip install, EXPOSE 8000, CMD uvicorn. Test with docker build and docker run",
            "docker-compose: add PostgreSQL service. Test the full stack locally before deploying",
            "Render: create account, New > Web Service > Docker, connect DockerHub. Add DATABASE_URL env var pointing to Neon PostgreSQL"
        ],
        "learningOutcome": (
            "You will know how to take any ML model from a notebook to a live public API — the exact workflow used in every ML product company. "
            "Docker + FastAPI + cloud deployment is a skill combination that makes you immediately productive on any ML engineering team. "
            "The live API URL and a Swagger documentation page are extremely impressive in a portfolio."
        ),
        "prerequisites": ["Python ML basics", "Basic REST API understanding", "Basic command line/terminal"],
        "conceptsCovered": [
            "FastAPI with Pydantic validation", "Model serialisation (joblib)",
            "Docker containerisation", "docker-compose for local dev",
            "Cloud deployment on Render", "Request logging for monitoring", "API documentation (Swagger)"
        ],
        "commonMistakes": [
            "Loading the model inside the predict function — this reloads a 50-200MB file on every request, adding 1-5 seconds latency",
            "No input validation — without Pydantic constraints, users can send negative ages or text where numbers are expected",
            "Hardcoding database credentials in code — always use environment variables loaded with python-dotenv",
            "Not testing the Docker container locally before deploying — build issues that fail silently locally will definitely fail on Render"
        ],
        "subjectIds": [],
        "subjectTitles": [],
        "published": True,
        "orderIndex": 62
    },

    # ── 11. FULL STACK (ALL ROLES) ───────────────────────────────────
    {
        "title": "Real-time Expense Tracker with AI Categorisation & Insights",
        "missionBrief": (
            "Personal finance tools like Splitwise, Walnut, and Money Manager process millions of transactions daily. "
            "Build a full-stack expense tracking app with a twist: when you add an expense, AI automatically "
            "categorises it (food, travel, entertainment, etc.) using NLP. "
            "The insights dashboard shows spending patterns, budget alerts, and trend forecasts. "
            "This is a technically complete project — real-time data, auth, AI integration, charts — "
            "and it is a product you can actually use daily, which makes portfolio demos compelling."
        ),
        "rank": "B",
        "techStack": ["React", "Django REST Framework", "PostgreSQL", "HuggingFace", "Recharts", "JWT Auth", "Render + Vercel"],
        "estimatedHours": 28,
        "category": "ROLE_BASED",
        "targetRoles": ["Full Stack Developer", "Python Full Stack Developer", "Django Developer", "MERN Stack Developer", "React Developer"],
        "objectives": [
            "Backend: Django REST API with JWT authentication. Models: User, Expense (amount, description, category, date, user), Budget (user, category, monthly_limit)",
            "AI categorisation: when expense is created, pass description to a zero-shot HuggingFace classifier (facebook/bart-large-mnli). Suggest category automatically — user can confirm or change",
            "React frontend: add expense form, expense list with filters (date range, category, amount range), edit and delete with optimistic UI updates",
            "Dashboard with Recharts: monthly spending bar chart, category breakdown donut chart, daily spending line chart, top 5 spending days",
            "Budget system: user sets monthly budget per category. Show progress bars and alerts when 80%+ spent",
            "Recurring expenses: user marks an expense as recurring, system auto-creates it on the specified date each month",
            "Deploy: Django backend on Render, React on Vercel, PostgreSQL on Neon (free, no expiry)"
        ],
        "bonusObjectives": [
            "Add Splitwise-like group expenses: create a group, add members, split bills, track who owes what",
            "Add bank statement import: parse CSV exports from HDFC/ICICI bank and auto-import transactions",
            "Add spending forecast: use linear regression on past 3 months to predict end-of-month spend per category"
        ],
        "hints": [
            "HuggingFace zero-shot classification is free with the Inference API: POST to api-inference.huggingface.co/models/facebook/bart-large-mnli with {inputs: description, parameters: {candidate_labels: ['food', 'travel', 'entertainment', 'shopping', 'bills', 'health']}}",
            "For optimistic UI updates in React: update local state immediately on submit, then sync with API. Revert if API call fails",
            "Recharts responsive containers: wrap charts in <ResponsiveContainer width='100%' height={300}> to make them responsive",
            "For recurring expenses, use Django management command + Render Cron Jobs (or cron-job.org) to run daily and create due expenses"
        ],
        "approachSteps": [
            "Backend first: set up Django project, create models, build CRUD APIs for expenses with JWT auth. Test every endpoint with Postman before touching React",
            "Add the AI categorisation as a Django service: call HuggingFace API in a try/except, return suggested category. Expense creation still works if AI call fails",
            "React: set up project, add axios with JWT interceptor, build the add expense form, then the list view",
            "Dashboard: collect chart data from dedicated API endpoints (/api/analytics/monthly, /api/analytics/by-category). Never compute aggregations in the frontend",
            "Budget: create Budget model and API. Frontend shows progress bars with colour coding (green < 60%, amber 60-80%, red > 80%)",
            "Deploy backend to Render with environment variables for PostgreSQL and HuggingFace API key",
            "Deploy frontend to Vercel, set VITE_API_URL env var to Render backend URL. Test CORS"
        ],
        "learningOutcome": (
            "This project combines everything: Django REST Framework, JWT auth, AI integration, React with complex state, "
            "real-time data updates, Recharts visualisation, and full deployment. "
            "It is the closest thing to a production product you can build solo, "
            "and the AI categorisation feature makes it memorable in interviews."
        ),
        "prerequisites": ["React basics", "Django REST Framework basics", "PostgreSQL basics", "JWT authentication concept"],
        "conceptsCovered": [
            "Django REST Framework CRUD", "JWT authentication", "Zero-shot NLP classification",
            "Recharts data visualisation", "Optimistic UI updates", "Budget alerts logic",
            "Full deployment (Render + Vercel + Neon)"
        ],
        "commonMistakes": [
            "Computing aggregations like monthly totals in the React frontend — always do this in the backend with database queries, it is 100x faster",
            "Not handling the case where the AI categorisation API is slow or fails — the expense should still save without a category",
            "Storing JWT tokens in localStorage — use httpOnly cookies or at minimum handle XSS risks. For a portfolio project, document the security tradeoff",
            "Not adding pagination to the expense list — at 1000+ expenses, fetching everything on every load will be very slow"
        ],
        "subjectIds": [],
        "subjectTitles": [],
        "published": True,
        "orderIndex": 63
    },
]


def main():
    # Login using cookie-based auth
    session = requests.Session()
    r = session.post(f"{BASE}/api/auth/login",
                     json={"email": "admin@demo.com", "password": "***REMOVED***"},
                     timeout=10)
    if r.status_code != 200:
        print(f"Login failed ({r.status_code}): {r.text}")
        sys.exit(1)
    print("Logged in OK")

    # Delete clone missions
    print("\n--- Deleting overused clone missions ---")
    for mid, label in DELETE_IDS:
        dr = session.delete(f"{BASE}/api/admin/missions/{mid}", timeout=10)
        status = "DELETED" if dr.status_code in (200, 204) else f"FAILED ({dr.status_code})"
        print(f"  {status}: {label}")

    # Add new missions
    print("\n--- Adding quality role-based missions ---")
    ok = 0
    for m in MISSIONS:
        r2 = session.post(f"{BASE}/api/admin/missions", json=m, timeout=15)
        if r2.status_code in (200, 201):
            print(f"  OK [{m['orderIndex']:3}] {m['rank']} | {m['title']}")
            ok += 1
        else:
            print(f"  FAIL [{m['orderIndex']:3}] {m['title']} -> {r2.status_code}: {r2.text[:120]}")

    print(f"\nDone. {ok}/{len(MISSIONS)} missions added.")


if __name__ == "__main__":
    main()
