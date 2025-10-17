import { Router, Route, Switch } from 'wouter';
import { AppShell } from './components/AppShell';
import { Landing } from './pages/Landing';
import { Search } from './pages/Search';
import { NFTDetail } from './pages/NFTDetail';

function App() {
  return (
    <Router>
      <AppShell>
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/search" component={Search} />
          <Route path="/nft/:mint" component={NFTDetail} />
          
          {/* 404 Page */}
          <Route>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  404 - Page Not Found
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  The page you're looking for doesn't exist.
                </p>
                <a 
                  href="/" 
                  className="inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Go Home
                </a>
              </div>
            </div>
          </Route>
        </Switch>
      </AppShell>
    </Router>
  );
}

export default App;
