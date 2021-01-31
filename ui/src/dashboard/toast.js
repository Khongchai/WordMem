import React from "react";
import "./toast.css";

var toastOrder = 1;

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
  toast.innerHTML = `${toastMessage} (${toastOrder})`;
  toast.style.backgroundColor = manageColor(optionalColor);
  manageTimeout(toast);
  toastOrder++;
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
    } else {
      //reset the order number when all toasts have faded out.
      toastOrder = 1;
    }
  }, 3000);
}

function addAnotherToastUnder(toast, toastMessage, optionalColor) {
  const anotherToast = toast.cloneNode(true);
  const toastComputedStyles = window.getComputedStyle(toast);
  anotherToast.style.cssText = toastComputedStyles.cssText;

  anotherToast.id = "";
  anotherToast.classList.remove("show");
  anotherToast.classList.add("extra-toasts", "toasts");

  const toasts = document.getElementsByClassName("toasts");
  const lastToast = toasts[0];
  lastToast.parentNode.insertBefore(anotherToast, lastToast);

  display(anotherToast, toastMessage, optionalColor);
}
