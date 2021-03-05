import createError from 'http-errors';
import express from 'express';
import finances from './finances';
import users from './users';

const app = express();

app.use('/finances', finances);
app.use('/users', users);
app.use('/', (req, res) => {
  res.statusCode = 302;
  res.setHeader('Location', '/finances');
  res.end();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
export default app;
