import { useState, useEffect } from 'react';

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'SmartSpark2024!') {
      setAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  const fetchContacts = async () => {
    const response = await fetch('/api/contacts-list');
    const data = await response.json();
    setContacts(data);
  };

  useEffect(() => {
    if (authenticated) {
      fetchContacts();
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1f2937'}}>
        <form onSubmit={handleLogin} style={{backgroundColor: '#374151', padding: '40px', borderRadius: '8px', minWidth: '300px'}}>
          <h2 style={{color: 'white', fontSize: '20px', marginBottom: '20px', textAlign: 'center'}}>🔐 Contacts Admin</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{width: '100%', padding: '12px', borderRadius: '4px', border: 'none', marginBottom: '15px'}}
            required
          />
          <button 
            type="submit" 
            style={{width: '100%', backgroundColor: '#3b82f6', color: 'white', padding: '12px', borderRadius: '4px', border: 'none', cursor: 'pointer'}}
          >
            Access Contacts
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{padding: '20px', backgroundColor: 'white', minHeight: '100vh', color: 'black'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h1 style={{fontSize: '24px', fontWeight: 'bold'}}>📧 Contact Submissions</h1>
        <a 
          href="/admin/blog" 
          style={{backgroundColor: '#6b7280', color: 'white', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none'}}
        >
          Blog Admin
        </a>
      </div>
      
      <div style={{backgroundColor: '#f9fafb', borderRadius: '8px', padding: '20px'}}>
        <h2 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '15px'}}>All Submissions ({contacts.length})</h2>
        
        {contacts.map((contact: any) => (
          <div key={contact.id} style={{backgroundColor: 'white', padding: '15px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #e5e7eb'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px'}}>
              <div><strong>Name:</strong> {contact.name}</div>
              <div><strong>Email:</strong> {contact.email}</div>
              <div><strong>Phone:</strong> {contact.phone || 'Not provided'}</div>
              <div><strong>Service:</strong> {contact.service}</div>
            </div>
            <div style={{marginBottom: '10px'}}>
              <strong>Message:</strong>
              <div style={{backgroundColor: '#f3f4f6', padding: '10px', borderRadius: '4px', marginTop: '5px'}}>
                {contact.message}
              </div>
            </div>
            <div style={{fontSize: '12px', color: '#9ca3af'}}>
              📅 {new Date(contact.created_at).toLocaleString()}
            </div>
          </div>
        ))}
        
        {contacts.length === 0 && (
          <div style={{textAlign: 'center', padding: '40px', color: '#6b7280'}}>
            <p>No contact submissions yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}