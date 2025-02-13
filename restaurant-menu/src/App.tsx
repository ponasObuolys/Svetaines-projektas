import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AdminPanel } from './components/AdminPanel';
import { TVDisplay } from './components/TVDisplay';
import { Box, Button, Container } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={
              <Container>
                <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button component={Link} to="/admin" variant="contained" color="primary">
                    Administravimas
                  </Button>
                  <Button component={Link} to="/tv" variant="contained" color="secondary">
                    TV Ekranas
                  </Button>
                </Box>
              </Container>
            } />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/tv" element={<TVDisplay />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
