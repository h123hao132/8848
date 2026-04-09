import React from 'react';
import ScoreAnalysis from '../components/ScoreAnalysis';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ScoreAnalysisPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <ScoreAnalysis />
      </main>
      <Footer />
    </div>
  );
};

export default ScoreAnalysisPage;