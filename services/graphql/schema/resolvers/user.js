import { User } from '../../../../models';

export default {
  Query: {
    currentUser: async ({ ctx }) => {
      console.log(ctx.currentUser);
      return ctx.currentUser
    }
  },
  Mutation: {
    signIn: async ({ ctx }, { user: { email, password } }) => {
      const user = await User.findOne({email});

      if (!user) {
        ctx.throw(404, 'EMAIL_NOT_FOUND');
      } else if (await !user.verifyPassword(password)) {
        ctx.throw(401, 'UNAUTHORISED');
      }

      return user.generateToken();
    },
    signUp: async ({ ctx }, { user: { email, password } }) => {
      try {
        const user = await new User({
          email,
          password,
        }).save()

        ctx.currentUser = user;

        return user;
      } catch (error) {
        if (error.code === 11000) {
          ctx.throw(422, 'DUPLICATE_EMAIL');
        };
        ctx.throw(422, 'UNEXPECTED_ERROR');
      }
    },
    signOut: async ({ ctx }) => {
      return ctx.currentToken.remove();
    },
    updateUser: async ({ ctx }, { user: { photoUrl } }) => {
      ctx.currentUser.set({photoUrl})
      return await ctx.currentUser.save()
    },
  },
  User: {
    profileImage: (user, { size }) => user.profileImages.filter(image => image.size == size)[0] || null,
  }
}
