import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function DataViewer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    const loginTime = localStorage.getItem('adminLoginTime');
    
    if (!adminLoggedIn || !loginTime) {
      router.push('/admin/login');
      return;
    }
    
    // Check if session expired (2 hours)
    const now = Date.now();
    const sessionAge = now - parseInt(loginTime);
    if (sessionAge > 2 * 60 * 60 * 1000) {
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminLoginTime');
      router.push('/admin/login');
      return;
    }
    
    setAuthorized(true);
    
    // Fetch data only if authorized
    fetch('/api/admin/submissions/')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [router]);

  if (!authorized) {
    return <div style={{padding: '20px'}}>Redirecting to login...</div>;
  }

  if (loading) return <div style={{padding: '20px'}}>Loading...</div>;

  return (
    <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
      <h1>Form Submissions Data</h1>
      
      <div style={{display: 'flex', gap: '20px', marginBottom: '30px'}}>
        <div style={{background: '#e3f2fd', padding: '20px', borderRadius: '8px', minWidth: '150px'}}>
          <h3 style={{margin: '0 0 10px 0'}}>Contact Forms</h3>
          <p style={{fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#1976d2'}}>
            {data?.contacts?.length || 0}
          </p>
        </div>
        <div style={{background: '#e8f5e8', padding: '20px', borderRadius: '8px', minWidth: '150px'}}>
          <h3 style={{margin: '0 0 10px 0'}}>Quote Requests</h3>
          <p style={{fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#388e3c'}}>
            {data?.quotes?.length || 0}
          </p>
        </div>
      </div>

      <div style={{background: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '20px'}}>
        <h2>Contact Form Submissions</h2>
        {data?.contacts?.map((contact, i) => (
          <div key={i} style={{borderBottom: '1px solid #eee', padding: '15px 0'}}>
            <div style={{fontWeight: 'bold', fontSize: '16px'}}>{contact.name}</div>
            <div style={{color: '#666', fontSize: '14px'}}>{contact.email}</div>
            <div style={{color: '#888', fontSize: '12px', marginBottom: '8px'}}>
              {new Date(contact.created_at).toLocaleString()}
            </div>
            <div style={{fontSize: '14px', lineHeight: '1.4'}}>
              {contact.message?.substring(0, 200)}
              {contact.message?.length > 200 ? '...' : ''}
            </div>
          </div>
        ))}
      </div>

      <div style={{background: 'white', border: '1px solid #ddd', borderRadius: '8px', padding: '20px'}}>
        <h2>Quote Requests</h2>
        {data?.quotes?.map((quote, i) => (
          <div key={i} style={{borderBottom: '1px solid #eee', padding: '15px 0'}}>
            <div style={{fontWeight: 'bold', fontSize: '16px'}}>{quote.name}</div>
            <div style={{color: '#666', fontSize: '14px'}}>{quote.email}</div>
            <div style={{color: '#888', fontSize: '12px', marginBottom: '8px'}}>
              {new Date(quote.created_at).toLocaleString()}
            </div>
            <div style={{fontSize: '14px'}}>
              <strong>Service:</strong> {quote.service} | <strong>Budget:</strong> {quote.budget}
            </div>
            <div style={{fontSize: '14px', marginTop: '5px'}}>
              {quote.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
