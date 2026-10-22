import useDocumentTitle from "../hooks/useDocumentTitle";

// Static data kept outside the component to prevent recreation on re-renders
const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse our collection, select a product, choose an available size, and add it to your cart. When you're ready, proceed to checkout and provide the required delivery information.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Payment options available at checkout will be displayed when you place your order. We typically accept Cash on Delivery and standard card payments.",
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

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="border-b border-stone-200 bg-[#FAFAFA]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:py-32">
          <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
            Support
          </p>
          <h1 className="mt-6 text-4xl font-light tracking-tight text-zinc-900 md:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-base text-stone-500">
            Everything you need to know about shopping with LUMÉ.
          </p>
        </div>
      </section>

      {/* Interactive Native FAQ List */}
      <section className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <div className="divide-y divide-stone-200 border-t border-stone-200">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group py-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-zinc-900 transition-colors hover:text-stone-500 focus:outline-none">
                <span className="text-base font-medium">{faq.question}</span>

                {/* Animated Chevron Icon */}
                <span className="ml-6 flex shrink-0 items-center justify-center transition-transform duration-300 group-open:rotate-180">
                  <svg
                    className="h-5 w-5 text-stone-400 transition-colors group-hover:text-zinc-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </summary>

              <p className="mt-4 pr-12 text-sm leading-relaxed text-stone-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}

export default FAQ;
