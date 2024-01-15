# Round Up #1
A round up of important tech related news that happened this week. Including Dolly, Databricks open source LLM. Node JS has released an official test runner and more.

<article>

###### DECODED
### Node JS is coming out with built-in testing
**SHORT**: With the newest release of Node v19.9.0, Node is getting a built-in test runner.

**LONG**: The test runner API is a new set of built-in tools that will allow you to create tests for your code natively. No more need for Jest, Mocha, or Ava! This will bring Node up with most modern languages (Dart, Rust, GO) and reduce the package size of your code base. It is not a drop-in replacement for other frameworks, so you will need to migrate all of your tests to the new syntax. However, the test runner syntax is very straightforward and takes inspiration from the existing frameworks. This will make transitioning to the built-in test runner much easier. 

</article>

<article>

###### CLOUD
### SupaBase Edge Function Update
**SHORT**: SupaBase open sources its edge function runtime allowing you to self-host deno edge functions.

**LONG**: Previously when using the `supabase functions serve` command, you could only serve one edge runtime. This hurt local developer workflow leading to alternative hacks. With the newest update of supabase, you are able to run all functions on the edge runtime using the `supabase functions serve` command.

</article>
<article>

###### HIVEMIND
### Databricks Releases a Fully Open Source LLM (DOLLY 2.0)
**SHORT**: After releasing `dolly 1.0` earlier this month, databricks has released an updated version that has been trained on a human-generated instruction set that is licensed for research and commercial use.

**LONG**: Databricks crowdsourced 15k human-generated prompts and responses from its over 5,000 employees. Creating a 12 billion parameter LLM that has been trained on high-quality prompts using the EleutherAI Pythia model. To see how they went about creating this LLM you can check out there great blog post about it [here](https://www.databricks.com/blog/2023/04/12/dolly-first-open-commercially-viable-instruction-tuned-llm "Databricks Blog Post")

</article>