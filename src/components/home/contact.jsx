import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const contact = () => {
  return (
    // <div className="text-center mb-16">
    //     <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">About A   Finance Tracker</h2>
    //     <p className="text-lg text-gray-600 max-w-3xl mx-auto">We're on a mission to democratize financial intelligence through cutting-edge AI technology, making sophisticated financial planning accessible to everyone.</p>
    // </div>
    <section id="contact">
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">Connect with Us</h2>
            <p className="text-lg text-gray-600 mb-8">We're here to help you every step of the way.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="border p-6 rounded-2xl shadow-sm">
              <h2 className="text-center font-bold text-2xl text-gray-900 mb-4">Send us a Message</h2>
              <p className="text-center text-gray-600 mb-8">We'd love to hear from you!</p>

              <form className="space-y-6">
                <div>
                  <Label htmlFor="name" className="font-semibold">
                    Name
                  </Label>
                  <Input id="name" placeholder="John Doe" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="email" className="font-semibold">
                    Email
                  </Label>
                  <Input id="email" type="email" placeholder="johndoe@gmail.com" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="message" className="font-semibold">
                    Message
                  </Label>
                  <Textarea id="message" placeholder="Your message here..." className="mt-2" rows="7" />
                </div>
                <div className="flex flex-col items-center">
                  <Button type="submit" className="font-semibold py-3 transition-all hover:scale-103">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>

            <div>
              <div className="p-2 rounded-2xl">
                <h3 className="font-bold text-2xl text-gray-900 mb-2">Get in Touch</h3>
                <p className="text-gray-600 mb-4">Ready to transform your financial future? Reach out to our team of experts who are dedicated to helping you achieve your financial goals.</p>
              </div>
              <div className="space-y-5">
                <div className="flex items-start space-x-4 border p-6 shadow-sm rounded-2xl ">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Us</h4>
                    <p className="text-gray-600">support@aifinancetracker.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 border p-6 shadow-sm rounded-2xl ">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Call Us</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 border p-6 shadow-sm rounded-2xl ">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Visit Us</h4>
                    <p className="text-gray-600">
                      123 Finance Street
                      <br />
                      New York, NY 10001
                    </p>
                    <p className="text-sm text-gray-500">By appointment only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default contact;
