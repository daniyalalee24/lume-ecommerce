import { useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse our collection, select a product, choose an available size, and add it to your cart. When you're ready, proceed to checkout and provide the required delivery information.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Payment options available at checkout will be displayed when you place your order.",
  },
  {
    question: "Do you offer Cash on Delivery?",
    answer:
      "Cash on Delivery availability depends on the delivery location and the options provided at checkout.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery times can vary depending on your location. You will receive the relevant delivery information when placing your order.",
  },
  {
    question: "Can I cancel or modify my order?",
    answer:
      "If you need to change or cancel an order, please contact us as soon as possible. Once an order has entered processing or shipment, changes may no longer be possible.",
  },
  {
    question: "Can I return or exchange an item?",
    answer:
      "Please contact us regarding your order if you need to request a return or exchange. Eligibility may depend on the condition of the item and the applicable return policy.",
  },
  {
    question: "How do I know which size to choose?",
    answer:
      "Available sizes are shown on each product. We recommend choosing the size that best matches your usual fit.",
  },
  {
    question: "Are all listed sizes available?",
    answer:
      "Product pages show the sizes currently available for each item. Only available sizes can be selected when placing an order.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You can view your order information through your account. If you need additional assistance, please contact LUMÉ with your order details.",
  },
  {
    question: "How can I contact LUMÉ?",
    answer:
      "If you need help with an order or have another question, please use the contact information provided on our website.",
  },
];

function FAQ() {
  useDocumentTitle("FAQ | LUMÉ");

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <main className="bg-white">
      {/* Header */}
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-6 sm:py-20 md:py-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400 sm:text-xs">
            Support
          </p>

          <h1 className="mt-4 text-3xl font-light tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:mt-5 sm:text-base sm:leading-7">
            Everything you need to know about shopping with LUMÉ.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="border-y border-gray-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <div
                key={faq.question}
                className="border-b border-gray-200 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-4 sm:gap-6 sm:py-6"
                >
                  <span className="pr-2 text-sm font-medium leading-6 text-gray-900 sm:text-base">
                    {faq.question}
                  </span>

                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-lg font-light text-gray-500"
                    aria-hidden="true"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div id={answerId} className="pb-5 pr-12 sm:pb-6 sm:pr-14">
                    <p className="text-sm leading-7 text-gray-500">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default FAQ;
    