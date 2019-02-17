import { shallowMount } from "@vue/test-utils";
import UserView from "@/views/UserView";
import VUserSearchForm from "@/components/VUserSearchForm";
import VUserProfile from "@/components/VUserProfile";

describe("UserView", () => {
  const build = () => {
    const wrapper = shallowMount(UserView);

    return {
      wrapper,
      userSearchForm: () => wrapper.find(VUserSearchForm),
      userProfile: () => wrapper.find(VUserProfile)
    };
  };

  it("renders the component", () => {
    const { wrapper } = build();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders main child components", () => {
    const { userSearchForm, userProfile } = build();

    expect(userSearchForm().exists()).toBe(true);
    expect(userProfile().exists()).toBe(true);
  });
});
