import React from "react";
import "./toast.css";

export default function Toast() {
  return (
    <section id="toasts-parent">
      <div id="main-toast" class="toasts" />
    </section>
  );
}

export async function showToast(toastMessage, optionalColor) {
  var toast = document.getElementById("main-toast");
  if (!toast.classList.contains("show")) {
    display(toast, toastMessage, optionalColor);
  } else {
    //If toast is showing, add another at the bottom
    addAnotherToastUnder(toast, toastMessage, optionalColor);
  }
}

function display(toast, toastMessage, optionalColor) {
  toast.classList.add("show");
  toast.innerHTML = toastMessage;
  toast.style.backgroundColor = manageColor(optionalColor);
  manageTimeout(toast);
}

function manageColor(optionalColor) {
  return optionalColor ? optionalColor : "#F17300";
}

function manageTimeout(toast) {
  window.setTimeout(function () {
    toast.classList.remove("show");
    //always reset color
    toast.style.background = "#F17300";
    if (toast.classList.contains("extra-toasts")) {
      toast.remove();
    }
  }, 3000);
}

function addAnotherToastUnder(toast, toastMessage, optionalColor) {
  const ANOTHER_TOAST = toast.cloneNode(true);
  const TOAST_COMPUTED_STYLES = window.getComputedStyle(toast);
  ANOTHER_TOAST.style.cssText = TOAST_COMPUTED_STYLES.cssText;

  ANOTHER_TOAST.id = "";
  ANOTHER_TOAST.classList.remove("show");
  ANOTHER_TOAST.classList.add("extra-toasts", "toasts");

  const TOASTS = document.getElementsByClassName("toasts");
  const LAST_TOAST = TOASTS[0];
  LAST_TOAST.parentNode.insertBefore(ANOTHER_TOAST, LAST_TOAST);

  display(ANOTHER_TOAST, toastMessage, optionalColor);
}
