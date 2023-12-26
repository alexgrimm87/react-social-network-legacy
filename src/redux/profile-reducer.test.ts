import profileReducer, {actions} from "./profile-reducer";

let state = {
  posts: [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: 'It\'s my first post', likesCount: 23}
  ],
  profile: null,
  status: ''
};

it('length of posts should be incremented', () => {
  // 1. test data
  let action = actions.addPostActionCreator("test-text");

  // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts.length).toBe(3);
});

it('message of new post should be correct', () => {
  // 1. test data
  let action = actions.addPostActionCreator("test-text");

  // 2. action
  let newState = profileReducer(state, action);

  // 3. expectation
  expect(newState.posts[2].message).toBe("test-text");
});
