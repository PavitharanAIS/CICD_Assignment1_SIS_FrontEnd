import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

// Wrapper to include Router for testing links
const renderWithRouter = (ui) => {
  return render(<Router>{ui}</Router>);
};

describe('NavBar', () => {
  test('renders Navbar with correct elements', () => {
    renderWithRouter(<NavBar />);

    // Check if the Navbar is rendered
    expect(screen.getByRole('navigation')).toBeInTheDocument();

    // Check if the Navbar.Brand is rendered with the correct text
    expect(screen.getByText(/SIS/i)).toBeInTheDocument();

    // Check if the Nav links are rendered with the correct text and href attributes
    const studentInfoLink = screen.getByText(/Student Info/i);
    expect(studentInfoLink).toBeInTheDocument();
    expect(studentInfoLink).toHaveAttribute('href', '/');

    const aboutMeLink = screen.getByText(/About Me/i);
    expect(aboutMeLink).toBeInTheDocument();
    expect(aboutMeLink).toHaveAttribute('href', '/aboutMe');

    const logoutLink = screen.getByText(/Logout/i);
    expect(logoutLink).toBeInTheDocument();
    expect(logoutLink).toHaveAttribute('href', '/logout');
  });
});
