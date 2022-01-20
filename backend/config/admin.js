module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '81cb1026215851701475a174c06e407d'),
  },
});
