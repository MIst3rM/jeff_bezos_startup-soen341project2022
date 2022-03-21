/**
 * @jest-environment jsdom
 */

import { shallowMount, createLocalVue } from "@vue/test-utils";
import Profile from "./src/views/Profile.vue";
import Router from "vue-router";
import VueMaterial, { MdButton } from "vue-material";
import VueHorizontal from "vue-horizontal";

const localVue = createLocalVue();
localVue.use(Router);
localVue.use(VueMaterial);
localVue.use(VueHorizontal);
const router = new Router();

const factory = () => {
  return shallowMount(Profile, {
    localVue,
    mocks: {
      $router: {
        push: () => {},
      },
    },
  });
};

describe("Profile", () => {
  it("router push called when save button clicked", async () => {
    const wrapper = factory();
    wrapper.getComponent({ ref: "save_info" }).trigger("click");

    //expect(wrapper.find(".md-error").exists()).toBeTruthy();

    // jest.spyOn($mocks.$router, "push");
    // const route = router.find((route) => route.name === "login");
    // expect(spy).toHaveBeenCalledWith(route);
  });
  //   it("renders a welcome message", () => {
  //     const wrapper = factory();

  //     expect(wrapper.find(".message").text()).toEqual(
  //       "Welcome to the Vue.js cookbook"
  //     );
  //   });

  //   it("renders an error when username is less than 7 characters", () => {
  //     const wrapper = factory({ username: "" });

  //     expect(wrapper.find(".error").exists()).toBeTruthy();
  //   });

  //   it("renders an error when username is whitespace", () => {
  //     const wrapper = factory({ username: " ".repeat(7) });

  //     expect(wrapper.find(".error").exists()).toBeTruthy();
  //   });

  //   it("does not render an error when username is 7 characters or more", () => {
  //     const wrapper = factory({ username: "Lachlan" });

  //     expect(wrapper.find(".error").exists()).toBeFalsy();
  //   });
});
