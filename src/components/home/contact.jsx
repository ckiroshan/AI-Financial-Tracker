import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Mail, Phone, MapPin, } from "lucide-react";

const contact = () => {
    return (
        <div className="py-16 md:py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="font-serif font-bold text-3xl md:text-4xl text-gray-900 mb-4">Connect with Us</h2>
                        <p className="font-sans text-lg text-gray-600 mb-8">We're here to help you every step of the way.</p>

                        <form className="space-y-6">
                            <div>
                                <Label htmlFor="name" className="font-sans font-semibold">
                                    Name
                                </Label>
                                <Input id="name" placeholder="John Doe" className="mt-2" />
                            </div>

                            <div>
                                <Label htmlFor="email" className="font-sans font-semibold">
                                    Email
                                </Label>
                                <Input id="email" type="email" placeholder="johndoe@gmail.com" className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="message" className="font-sans font-semibold">
                                    Message
                                </Label>
                                <Textarea id="message" placeholder="Your message here..." className="mt-2" rows="4" />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 font-semibold py-3 transition-all hover:scale-105"
                            >
                                Send Message
                            </Button>
                        </form>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-serif font-bold text-2xl text-gray-900 mb-6">Get in Touch</h3>
                            <p className="font-sans text-gray-600 mb-8">
                                Ready to transform your financial future? Reach out to our team of experts who are dedicated to
                                helping you achieve your financial goals.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-sans font-semibold text-gray-900">Email Us</h4>
                                    <p className="font-sans text-gray-600">support@aifinancetracker.com</p>
                                    <p className="font-sans text-sm text-gray-500">We'll respond within 24 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-sans font-semibold text-gray-900">Call Us</h4>
                                    <p className="font-sans text-gray-600">+1 (555) 123-4567</p>
                                    <p className="font-sans text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-sans font-semibold text-gray-900">Visit Us</h4>
                                    <p className="font-sans text-gray-600">
                                        123 Finance Street
                                        <br />
                                        New York, NY 10001
                                    </p>
                                    <p className="font-sans text-sm text-gray-500">By appointment only</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    )
}

export default contact