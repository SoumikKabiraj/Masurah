import React from 'react';
import Layout from '../components/Layout';

const HomePage = () => {
  return (
    <Layout>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-around' }}>
        <div>
          <h1 style={{ fontSize: '2em', margin: '1em 0' }}>Welcome to Masura Inventory Management System</h1>
          <p style={{ fontSize: '1.2em', margin: '1em 0' }}>
            This is a powerful and efficient Inventory Management System designed to help businesses like Masura manage their inventory seamlessly.
          </p>
          <p style={{ fontSize: '1.2em', margin: '1em 0' }}>
            If you are experiencing issues or need access, please contact the administrator.
          </p>
        </div>
        <div>
           <p style={{ fontSize: '1em', marginTop: '0.5em', color: 'gray', opacity: 0.6 }}>
              © 2024 Soumik Kabiraj. All rights reserved.
            </p>
            <p style={{ fontSize: '.8em', color: 'gray', opacity: 0.4 }}>
              For inquiries, please contact: soumik.kabiraj@gmail.com
            </p>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
