import ArticleLayout from "@/components/layout/ArticleLayout";

export default function SalesEngineBlueprint() {
  return (
    <ArticleLayout
      title="Anatomy of a 24/7 Sales Engine: Cloning a Top Performer."
      excerpt="We analyzed 5,000 successful sales calls and encoded the persuasion logic into Python. Here is the blueprint."
      date="NOV 02"
      tag="TECHNICAL"
    >
      <p className="lead text-xl text-gray-600 mb-8 font-light">
        The holy grail of sales is consistency. Even your best performer has off days. They get tired, they get distracted, they forget the script. But software never forgets. Software never sleeps.
      </p>

      <h3>The Objective</h3>
      <p>
        Our goal was simple but ambitious: Clone the logic of a top 1% sales performer into an automated workflow. We wanted a system that could handle inbound leads, qualify them via SMS/Chat, answer objections, and book meetings directly onto the calendar—all without human intervention.
      </p>

      <h3>The Stack</h3>
      <p>
        To build this, we integrated three core technologies:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-8 text-gray-600">
        <li><strong>OpenAI API (GPT-4o):</strong> The brain. Handles natural language understanding, sentiment analysis, and dynamic response generation.</li>
        <li><strong>Supabase (PostgreSQL):</strong> The memory. Stores conversation context, lead data, and booking status.</li>
        <li><strong>Twilio:</strong> The voice/hands. Handles the actual SMS delivery and receiving.</li>
      </ul>

      <h3>The Logic Core: Sentiment Analysis</h3>
      <p>
        The key differentiator is the system's ability to "read the room." It doesn't just blast generic templates. It analyzes the sentiment of the lead's response to determine the next move.
      </p>

      <div className="my-10 rounded-lg overflow-hidden border border-gray-800 bg-[#1e1e1e] shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700 bg-[#252526]">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-gray-400 font-mono">sentiment_engine.py</span>
        </div>
        <div className="p-6 overflow-x-auto">
          <pre className="text-sm font-mono leading-relaxed text-gray-300">
{`def analyze_sentiment(message_content):
    """
    Analyzes the lead's message to determine intent.
    Returns a score from -1 (Negative) to 1 (Positive).
    """
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a sales psychology expert."},
            {"role": "user", "content": f"Analyze this text: '{message_content}'"}
        ]
    )
    
    intent_score = extract_score(response)
    
    if intent_score > 0.8:
        return "HOT_LEAD_BOOK_NOW"
    elif intent_score < -0.5:
        return "OBJECTION_HANDLING_MODE"
    else:
        return "NURTURE_MODE"

# Example Usage
incoming_msg = "That sounds interesting but I'm worried about the price."
action = analyze_sentiment(incoming_msg)
# Output: "OBJECTION_HANDLING_MODE" -> Triggers price reassurance script`}
          </pre>
        </div>
      </div>

      <h3>The Result</h3>
      <p>
        This system doesn't replace sales teams; it unleashes them. By handling the grueling initial qualification and scheduling, your human closers spend 100% of their time on high-value closing calls, not chasing ghosts.
      </p>
      <p>
        We've seen this architecture reduce Customer Acquisition Cost (CAC) by 40% while increasing lead-to-appointment conversion rates by 3x.
      </p>

    </ArticleLayout>
  );
}
