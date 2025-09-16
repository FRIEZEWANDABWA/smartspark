export default function AdminTest() {
  return (
    <div style={{padding: '20px'}}>
      <h1>Admin Test Page</h1>
      <p>This page works!</p>
      <div id="data">Loading data...</div>
      <script dangerouslySetInnerHTML={{
        __html: `
          setTimeout(() => {
            fetch('/api/admin/submissions/')
              .then(res => res.json())
              .then(data => {
                document.getElementById('data').innerHTML = 
                  '<h2>Contacts: ' + (data.contacts?.length || 0) + '</h2>' +
                  '<h2>Quotes: ' + (data.quotes?.length || 0) + '</h2>' +
                  '<div><h3>Recent Contacts:</h3>' +
                  data.contacts.map(c => '<p>' + c.name + ' - ' + c.email + '</p>').join('') +
                  '</div>';
              })
              .catch(err => {
                document.getElementById('data').innerHTML = 'Error: ' + err.message;
              });
          }, 1000);
        `
      }} />
    </div>
  );
}
