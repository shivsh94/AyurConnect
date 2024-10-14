import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-6">
        About Us
      </h1>
      <p className="text-lg text-gray-200 mb-4">
        At AyurConnect, we are committed to bridging the gap between traditional Ayurvedic wisdom and modern healthcare needs. Our platform is designed to offer you access to a comprehensive range of Ayurvedic services, including personalized consultations with highly qualified practitioners, herbal remedies, and holistic wellness programs—all at your fingertips.
      </p>

      <h2 className="text-2xl font-semibold text-green-500 mt-6 mb-4">
        Our Mission
      </h2>
      <p className="text-lg text-gray-200 mb-4">
        Our mission is simple: to bring the timeless healing power of Ayurveda to everyone, regardless of where they are in the world. We believe in the transformative benefits of Ayurveda in promoting natural healing, maintaining balance, and fostering overall well-being.
      </p>

      <h2 className="text-2xl font-semibold text-green-500 mt-6 mb-4">
        Who We Are
      </h2>
      <p className="text-lg text-gray-200 mb-4">
        Founded by a group of passionate Ayurvedic practitioners and technology enthusiasts, AyurConnect was created to provide an easy and effective way for people to consult with Ayurvedic doctors from the comfort of their homes. Our team includes experienced Ayurvedic specialists with deep expertise in natural healing, lifestyle counseling, and holistic therapies.
      </p>

      <h2 className="text-2xl font-semibold text-green-500 mt-6 mb-4">
        Why Choose Us?
      </h2>
      <ul className="list-disc list-inside text-lg text-gray-200 mb-4">
        <li>Qualified Experts: Our Ayurvedic doctors are certified and experienced in treating a wide range of health conditions.</li>
        <li>Personalized Care: Our practitioners provide tailored treatment plans based on your unique constitution and health concerns.</li>
        <li>Holistic Healing: We treat the root cause of illnesses, integrating diet, herbal medicine, yoga, and meditation.</li>
        <li>Convenience: Schedule consultations at a time that works for you without leaving your home.</li>
        <li>Secure and Confidential: Your health information is kept private and secure.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-green-500 mt-6 mb-4">
        Our Approach
      </h2>
      <p className="text-lg text-gray-200 mb-4">
        Ayurveda, which translates to “the science of life,” emphasizes the importance of balancing the mind, body, and spirit to achieve optimal health. We follow this principle in our consultations, offering comprehensive care that goes beyond medications to include dietary recommendations and lifestyle changes.
      </p>

      <h2 className="text-2xl font-semibold text-green-500 mt-6 mb-4">
        What We Offer
      </h2>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
        <li>Online Consultations: Talk directly with our Ayurvedic doctors via video or audio call.</li>
        <li>Herbal Remedies: Receive natural Ayurvedic herbs and medicines based on your consultation.</li>
        <li>Wellness Programs: Tailored wellness programs focusing on holistic healing.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-green-500 mt-6 mb-4">
        Our Values
      </h2>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
        <li>Integrity: Committed to providing honest and ethical Ayurvedic care.</li>
        <li>Excellence: Dedicated to upholding the highest standards of Ayurvedic practice.</li>
        <li>Compassion: We care deeply about the well-being of our clients.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-green-500 mt-6 mb-4">
        Contact Us
      </h2>
      <p className="text-lg text-gray-200 mb-4">
        Have questions or want to know more about our services? Feel free to reach out to us! Our team is always here to help guide you on your Ayurvedic path.
      </p>

      <div className="mt-8 text-center">
        <Link to="/" className="text-lg text-blue-600 underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
