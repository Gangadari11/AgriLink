import MainLayout from "../layouts/MainLayout"
import { CheckCircle, Heart, Globe } from "lucide-react"

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Amara Perera",
      role: "Founder & CEO",
      bio: "Former farmer with 15 years of experience in agriculture and technology.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Dinesh Kumar",
      role: "CTO",
      bio: "Tech expert with a passion for applying technology to solve agricultural challenges.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Fathima Rizvi",
      role: "Head of Operations",
      bio: "Expert in supply chain management with experience in agricultural logistics.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Lakmal Silva",
      role: "Lead Data Scientist",
      bio: "Specializes in agricultural data analysis and predictive modeling.",
      image: "https://via.placeholder.com/150",
    },
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-agri-primary/10 to-agri-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-agri-dark mb-6">About AgriLink</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connecting farmers directly to buyers, eliminating middlemen, and creating a sustainable agricultural
            ecosystem in Sri Lanka.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-agri-dark mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                AgriLink was born out of a simple observation: farmers in Sri Lanka were struggling to get fair prices
                for their produce, while consumers were paying high prices due to multiple intermediaries in the supply
                chain.
              </p>
              <p className="text-gray-600 mb-4">
                Founded in 2022 by Amara Perera, a former farmer herself, AgriLink set out to create a direct
                marketplace that connects farmers with buyers, eliminating unnecessary middlemen and creating a more
                efficient, transparent agricultural ecosystem.
              </p>
              <p className="text-gray-600">
                What started as a small pilot project in Nuwara Eliya has now grown into a nationwide platform serving
                thousands of farmers and buyers across Sri Lanka, with plans to expand to other regions in South Asia.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://via.placeholder.com/600x400"
                alt="Farmers in Sri Lanka"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-agri-dark mb-4">Our Mission, Vision & Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We're driven by a clear purpose and guided by strong values in everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-agri-primary/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="text-agri-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-agri-dark mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To empower farmers with technology and direct market access, ensuring fair prices for their produce
                while providing consumers with fresh, traceable vegetables at reasonable prices.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-agri-primary/10 rounded-full flex items-center justify-center mb-6">
                <Globe className="text-agri-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-agri-dark mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To create a sustainable agricultural ecosystem where farmers thrive, consumers have access to quality
                produce, and technology bridges the gap between farm and table across South Asia.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-agri-primary/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="text-agri-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-agri-dark mb-4">Our Values</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Transparency in all transactions</li>
                <li>• Fairness to farmers and buyers</li>
                <li>• Sustainability in agricultural practices</li>
                <li>• Innovation through technology</li>
                <li>• Community empowerment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-agri-dark mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind AgriLink who are committed to transforming agriculture in Sri Lanka.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md text-center">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mt-8 border-4 border-agri-primary/20"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-agri-dark">{member.name}</h3>
                  <p className="text-agri-primary font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-agri-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="max-w-3xl mx-auto">
              Since our launch, we've made a significant difference in the agricultural landscape of Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <p>Farmers Onboarded</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">12,000+</div>
              <p>Active Buyers</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">30%</div>
              <p>Average Increase in Farmer Income</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15%</div>
              <p>Reduction in Food Waste</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-agri-dark mb-4">Our Partners</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We collaborate with organizations that share our vision for a sustainable agricultural future.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="p-4 grayscale hover:grayscale-0 transition-all">
              <img src="https://via.placeholder.com/200x80?text=Partner+1" alt="Partner 1" className="mx-auto" />
            </div>
            <div className="p-4 grayscale hover:grayscale-0 transition-all">
              <img src="https://via.placeholder.com/200x80?text=Partner+2" alt="Partner 2" className="mx-auto" />
            </div>
            <div className="p-4 grayscale hover:grayscale-0 transition-all">
              <img src="https://via.placeholder.com/200x80?text=Partner+3" alt="Partner 3" className="mx-auto" />
            </div>
            <div className="p-4 grayscale hover:grayscale-0 transition-all">
              <img src="https://via.placeholder.com/200x80?text=Partner+4" alt="Partner 4" className="mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 bg-gradient-to-r from-agri-primary/10 to-agri-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-agri-dark mb-6">Join the AgriLink Community</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Whether you're a farmer looking to sell your produce or a buyer seeking fresh vegetables, become part of our
            growing community today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="bg-agri-primary text-white px-8 py-3 rounded-md font-medium hover:bg-agri-dark transition-colors"
            >
              Sign Up Now
            </a>
            <a
              href="/contact"
              className="bg-white text-agri-primary px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors border border-agri-primary"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default AboutPage
