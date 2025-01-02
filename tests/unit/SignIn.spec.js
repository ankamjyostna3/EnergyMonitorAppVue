import { shallowMount } from '@vue/test-utils';
import axios from 'axios';
import SignIn from '@/components/SignIn.vue';

jest.mock('axios');

describe('SignIn.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SignIn);
  });

  it('renders the sign-in form', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('sets errorMessage when no token is received', async () => {
    axios.post.mockResolvedValue({ data: {} });

    await wrapper.vm.signIn();

    expect(wrapper.vm.errorMessage).toBe('Server is down. Please try again later.');
  });

  it('sets errorMessage when sign-in fails', async () => {
    axios.post.mockRejectedValue(new Error('Network Error'));

    await wrapper.vm.signIn();

    expect(wrapper.vm.errorMessage).toBe('Server is down. Please try again later.');
  });

  it('redirects to dashboard on successful sign-in', async () => {
    const token = 'fake-token';
    axios.post.mockResolvedValue({ data: { token } });
    const push = jest.fn();
    wrapper.vm.$router = { push };

    await wrapper.vm.signIn();

    expect(sessionStorage.getItem('authToken')).toBe(token);
    expect(push).toHaveBeenCalledWith('/dashboard');
  });
});