import app from './app';

app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});

console.log('Server running at http://localhost:4000/');
