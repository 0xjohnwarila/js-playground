import { shallowMount } from "@vue/test-utils";
import VUserSearchForm from "@/components/VUserSearchForm";

describe("VUserSearchForm", () => {
  const build = () => {
    const wrapper = shallowMount(VUserSearchForm);

    return {
      wrapper,
      input: () => wrapper.find("input"),
      button: () => wrapper.find("button")
    };
  };

  it("renders the component", () => {
    const { wrapper } = build();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders main child components", () => {
    const { input, button } = build();

    expect(input().exists()).toBe(true);
    expect(button().exists()).toBe(true);
  });

  it("calls 'submitted' event when submitting form", () => {
    const expectedUser = "kuroski";
    const { wrapper, button, input } = build();
    input().element.value = expectedUser;

    input().trigger("input");
    button().trigger("click");
    button().trigger("submit");

    expect(wrapper.emitted().submitted[0]).toEqual([expectedUser]);
  });
});
