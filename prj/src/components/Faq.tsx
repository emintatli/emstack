import { FAQPageJsonLd } from 'next-seo'
import React from 'react'

const FAQ = ({ faqs }: { faqs: { question: string; answer: string }[] }) => {
    return (
        <section className="bg-white p-6 rounded-xl border mt-8 w-full">
            <FAQPageJsonLd
                useAppDir={true}
                mainEntity={faqs.map((faq: any) => ({
                    questionName: faq.question,
                    acceptedAnswerText: faq.answer,
                }))}
            />
            <h3 className="text-xl font-bold mb-4">
                Frequently Asked Questions
            </h3>
            {faqs.map((faq: any, index: any) => (
                <div key={index} className="mb-4">
                    <h3 className="font-semibold">{faq.question}</h3>
                    <p>{faq.answer}</p>
                </div>
            ))}
        </section>
    )
}

export default FAQ
