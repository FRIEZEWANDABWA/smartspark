import { useState, useEffect } from 'react';

export default function SecureAdmin() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'SmartSpark2024!') {
      setAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetch('/api/admin/submissions/')
        .then(res => res.json())
        .then(data => {
          setData(data);
          setLoading(false);
        });
    }
  }, [authenticated]);

  // Filter functions
  const filterByDate = (items) => {
    if (dateFilter === 'all') return items;
    const now = new Date();
    const filterDate = new Date();
    
    switch(dateFilter) {
      case 'today':
        filterDate.setHours(0, 0, 0, 0);
        return items.filter(item => new Date(item.created_at) >= filterDate);
      case 'week':
        filterDate.setDate(now.getDate() - 7);
        return items.filter(item => new Date(item.created_at) >= filterDate);
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        return items.filter(item => new Date(item.created_at) >= filterDate);
      default:
        return items;
    }
  };

  const filterBySearch = (items) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.service?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filterByService = (items) => {
    if (serviceFilter === 'all') return items;
    return items.filter(item => 
      item.service?.toLowerCase().includes(serviceFilter.toLowerCase()) ||
      item.message?.toLowerCase().includes(serviceFilter.toLowerCase())
    );
  };

  const filteredContacts = data ? filterByService(filterBySearch(filterByDate(data.contacts || []))) : [];
  const filteredQuotes = data ? filterByService(filterBySearch(filterByDate(data.quotes || []))) : [];

  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
      }}>
        <form onSubmit={handleLogin} style={{
          background: '#2d3748',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          minWidth: '350px',
          border: '1px solid #4a5568'
        }}>
          <h2 style={{
            textAlign: 'center', 
            marginBottom: '30px', 
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            🔐 SmartSpark Admin
          </h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '15px',
              border: '1px solid #4a5568',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '16px',
              background: '#1a202c',
              color: '#ffffff',
              outline: 'none'
            }}
          />
          <button type="submit" style={{
            width: '100%',
            padding: '15px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            🚀 Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      background: '#1a202c',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px'
    }}>
      Loading admin data...
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a202c',
      color: '#ffffff',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{maxWidth: '1400px', margin: '0 auto'}}>
        {/* Header */}
        <div style={{
          background: '#2d3748',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          marginBottom: '30px',
          border: '1px solid #4a5568'
        }}>
          <h1 style={{
            margin: '0 0 30px 0', 
            color: '#ffffff', 
            fontSize: '32px',
            fontWeight: '700',
            textAlign: 'center'
          }}>
            📊 SmartSpark Admin Dashboard
          </h1>

          
          {/* Stats Cards */}
          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '25px', 
            marginBottom: '30px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
            }}>
              <h3 style={{margin: '0 0 15px 0', fontSize: '20px', fontWeight: '600'}}>📧 Contact Forms</h3>
              <p style={{fontSize: '42px', fontWeight: 'bold', margin: '0 0 10px 0'}}>
                {filteredContacts.length}
              </p>
              <p style={{fontSize: '14px', opacity: 0.9}}>
                Total: {data?.contacts?.length || 0}
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center',
              boxShadow: '0 8px 25px rgba(240, 147, 251, 0.3)'
            }}>
              <h3 style={{margin: '0 0 15px 0', fontSize: '20px', fontWeight: '600'}}>💰 Quote Requests</h3>
              <p style={{fontSize: '42px', fontWeight: 'bold', margin: '0 0 10px 0'}}>
                {filteredQuotes.length}
              </p>
              <p style={{fontSize: '14px', opacity: 0.9}}>
                Total: {data?.quotes?.length || 0}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            padding: '25px',
            background: '#1a202c',
            borderRadius: '10px',
            border: '1px solid #4a5568'
          }}>
            <div>
              <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#e2e8f0'}}>
                🔍 Search
              </label>
              <input
                type="text"
                placeholder="Search name, email, message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #4a5568',
                  borderRadius: '8px',
                  background: '#2d3748',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#e2e8f0'}}>
                📅 Date Filter
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #4a5568',
                  borderRadius: '8px',
                  background: '#2d3748',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', fontWeight: '600', color: '#e2e8f0'}}>
                🛠️ Service Filter
              </label>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #4a5568',
                  borderRadius: '8px',
                  background: '#2d3748',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              >
                <option value="all">All Services</option>
                <option value="web development">Web Development</option>
                <option value="digital marketing">Digital Marketing</option>
                <option value="graphic design">Graphic Design</option>
                <option value="data services">Data Services</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Submissions */}
        <div style={{
          background: '#2d3748',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          marginBottom: '30px',
          border: '1px solid #4a5568'
        }}>
          <div style={{padding: '25px', borderBottom: '1px solid #4a5568'}}>
            <h2 style={{margin: 0, color: '#ffffff', fontSize: '24px', fontWeight: '600'}}>
              📧 Contact Form Submissions ({filteredContacts.length})
            </h2>
          </div>
          <div style={{padding: '25px'}}>
            {filteredContacts.map((contact, i) => (
              <div key={i} style={{
                border: '1px solid #4a5568',
                borderRadius: '12px',
                padding: '25px',
                marginBottom: '20px',
                background: '#1a202c'
              }}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
                  <div>
                    <strong style={{color: '#81c784'}}>👤 Name:</strong> 
                    <span style={{color: '#e2e8f0', marginLeft: '10px'}}>{contact.name}</span>
                  </div>
                  <div>
                    <strong style={{color: '#81c784'}}>📧 Email:</strong> 
                    <span style={{color: '#e2e8f0', marginLeft: '10px'}}>{contact.email}</span>
                  </div>
                </div>
                <div style={{marginBottom: '20px'}}>
                  <strong style={{color: '#81c784'}}>📅 Date:</strong> 
                  <span style={{color: '#e2e8f0', marginLeft: '10px'}}>
                    {new Date(contact.created_at).toLocaleString()}
                  </span>
                </div>
                <div>
                  <strong style={{color: '#81c784'}}>💬 Message:</strong>
                  <div style={{
                    background: '#2d3748',
                    padding: '20px',
                    borderRadius: '8px',
                    marginTop: '10px',
                    border: '1px solid #4a5568',
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.6',
                    color: '#e2e8f0'
                  }}>
                    {contact.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Requests */}
        <div style={{
          background: '#2d3748',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          border: '1px solid #4a5568'
        }}>
          <div style={{padding: '25px', borderBottom: '1px solid #4a5568'}}>
            <h2 style={{margin: 0, color: '#ffffff', fontSize: '24px', fontWeight: '600'}}>
              💰 Quote Requests ({filteredQuotes.length})
            </h2>
          </div>
          <div style={{padding: '25px'}}>
            {filteredQuotes.map((quote, i) => (
              <div key={i} style={{
                border: '1px solid #4a5568',
                borderRadius: '12px',
                padding: '25px',
                marginBottom: '20px',
                background: '#1a202c'
              }}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px'}}>
                  <div>
                    <strong style={{color: '#f093fb'}}>👤 Name:</strong> 
                    <span style={{color: '#e2e8f0', marginLeft: '10px'}}>{quote.name}</span>
                  </div>
                  <div>
                    <strong style={{color: '#f093fb'}}>📧 Email:</strong> 
                    <span style={{color: '#e2e8f0', marginLeft: '10px'}}>{quote.email}</span>
                  </div>
                  <div>
                    <strong style={{color: '#f093fb'}}>🛠️ Service:</strong> 
                    <span style={{color: '#e2e8f0', marginLeft: '10px'}}>{quote.service}</span>
                  </div>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
                  <div>
                    <strong style={{color: '#f093fb'}}>💰 Budget:</strong> 
                    <span style={{color: '#e2e8f0', marginLeft: '10px'}}>{quote.budget}</span>
                  </div>
                  <div>
                    <strong style={{color: '#f093fb'}}>📅 Date:</strong> 
                    <span style={{color: '#e2e8f0', marginLeft: '10px'}}>
                      {new Date(quote.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
                {quote.message && (
                  <div>
                    <strong style={{color: '#f093fb'}}>📝 Details:</strong>
                    <div style={{
                      background: '#2d3748',
                      padding: '20px',
                      borderRadius: '8px',
                      marginTop: '10px',
                      border: '1px solid #4a5568',
                      whiteSpace: 'pre-wrap',
                      lineHeight: '1.6',
                      color: '#e2e8f0'
                    }}>
                      {quote.message}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
