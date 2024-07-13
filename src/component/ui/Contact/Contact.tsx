"use client";
import React from "react";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div className=" mb-10">
      <div className=" text-center mb-6">
        <p className=" font-semibold text-xl mb-4">Contact Information</p>
        <p className=" md:w-[70ch] mx-auto">
          Need assistance or have questions? Contact us for expert guidance and
          support on all things baby care. We are here to help make your
          parenting journey smoother and more enjoyable
        </p>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
