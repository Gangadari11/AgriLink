"use client"

import { useState } from "react"
import MainLayout from "../layouts/MainLayout"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setFormSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-agri-primary/10 to-agri-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-agri-dark mb-6">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Reach out to our team using the information below.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-agri-dark mb-8">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-agri-primary/10 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-agri-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-agri-dark">Our Location</h3>
                    <p className="text-gray-600">
                      123 Agriculture Road
                      <br />
                      Colombo 05
                      <br />
                      Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-agri-primary/10 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-agri-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-agri-dark">Phone</h3>
                    <p className="text-gray-600">
                      +94 11 123 4567
                      <br />
                      +94 77 987 6543
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-agri-primary/10 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-agri-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-agri-dark">Email</h3>
                    <p className="text-gray-600">
                      info@agrilink.lk
                      <br />
                      support@agrilink.lk
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-agri-primary/10 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-agri-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-agri-dark">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 8:30 AM - 5:30 PM
                      <br />
                      Saturday: 9:00 AM - 1:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="font-bold text-lg text-agri-dark mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-agri-primary/10 p-3 rounded-full hover:bg-agri-primary/20 transition-colors"
                  >
                    <svg
                      className="h-5 w-5 text-agri-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-agri-primary/10 p-3 rounded-full hover:bg-agri-primary/20 transition-colors"
                  >
                    <svg
                      className="h-5 w-5 text-agri-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-agri-primary/10 p-3 rounded-full hover:bg-agri-primary/20 transition-colors"
                  >
                    <svg
                      className="h-5 w-5 text-agri-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="bg-agri-primary/10 p-3 rounded-full hover:bg-agri-primary/20 transition-colors"
                  >
                    <svg
                      className="h-5 w-5 text-agri-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-agri-dark mb-6">Send Us a Message</h2>

                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-agri-dark mb-2">Thank You!</h3>
                    <p className="text-gray-600 text-center">
                      Your message has been sent successfully. We'll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-6 bg-agri-primary text-white px-6 py-2 rounded-md font-medium hover:bg-agri-dark transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agri-primary"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agri-primary"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agri-primary"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-agri-primary"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-agri-primary text-white px-6 py-3 rounded-md font-medium hover:bg-agri-dark transition-colors flex items-center justify-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-agri-dark mb-8 text-center">Find Us</h2>
          <div className="h-96 bg-gray-300 rounded-lg overflow-hidden">
            {/* Replace with actual Google Maps embed */}
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-gray-600">Google Maps will be embedded here</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-agri-dark mb-8 text-center">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-agri-dark mb-2">How do I sign up as a farmer?</h3>
              <p className="text-gray-600">
                You can sign up as a farmer by clicking the "Sign Up" button on our homepage and selecting "Farmer" as
                your account type. You'll need to provide some basic information about your farm and the types of
                produce you grow.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-agri-dark mb-2">How does the payment system work?</h3>
              <p className="text-gray-600">
                We use PayHere as our payment gateway, which supports various payment methods including credit/debit
                cards, mobile wallets, and bank transfers. Payments are secure and farmers receive their funds within
                2-3 business days.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-agri-dark mb-2">What areas do you deliver to?</h3>
              <p className="text-gray-600">
                Currently, we deliver to all major cities in Sri Lanka including Colombo, Kandy, Galle, and Jaffna.
                We're continuously expanding our delivery network to reach more areas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-agri-dark mb-2">How fresh is the produce?</h3>
              <p className="text-gray-600">
                All produce on AgriLink is harvested within 24-48 hours of delivery. Our system tracks freshness and we
                only list products that meet our quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default ContactPage
