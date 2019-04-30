$(function() {
  var LIST_DOM_SELECTOR = "#speaker-list";
  var MENU_DOM_SELECTOR = "#presentation-select";

  var buildPresentations = function(
    presentations,
    listDomSelector,
    menuDomSelector
  ) {
    // dynamically build presentation list
    presentations.forEach(function(presi) {
      var specialCharRegex = /\W|_/g;
      var urlSlug = _.compact(
        presi.title
          .toLowerCase()
          .replace(specialCharRegex, " ")
          .split(" ")
      ).join("-");
      var listTemplate = `
        <section id="${urlSlug}" class="sponsors section-padding section-bord">
          <div class="container">
            <h5 class="tit tit-left">${presi.title}</h5>
            <div class="row">
              <div class="tit-center col-md-10 mb-100">
                <h6>${presi.name}</h6>
                <p>${presi.description}</p>
              </div>
            </div>
          </div>
        </section>
      `;
      $(listDomSelector).append(listTemplate);

      // dynamically build presentation menu
      var menuItemDomSelector = "presentation-menu-item";
      var menuItemTemplate = `
        <option class="${menuItemDomSelector}" value="${urlSlug}">
          ${presi.title}
        </option>
      `;
      $(menuDomSelector).append(menuItemTemplate);
    });

    // scroll to presentation on menu selection
    $(menuDomSelector).on("change", function() {
      var optionSelected = $("option:selected", this);
      var valueSelected = this.value;
      $(document).scrollTop($(`#${valueSelected}`).offset().top);
    });
  };

  var Presentation = function(speakerName, title, description) {
    return {
      name: speakerName,
      title: title,
      description: description
    };
  };

  var presentationList = [
    new Presentation(
      "Gabriel Obregon",
      "Real World React Hooks and a bit of Frontend History",
      `Demonstration of how to use React hooks for abstraction, in a practical way, while also showing how to avoid some pitfalls that have been identified with hooks. There will also be a comparison of where we are now in the frontend world with hooks and how it compares with techniques that have been used the last 5 years. Comparing with how things were done in the past we can see how knowledge does transfer to the new paradigms and how it may or may not be better than before. At the end of the day good programming practices and how to apply them will always be more important than any technology that comes along.`
    ),
    new Presentation(
      "Mohinder Dick",
      "From Silos to Sharing - How we use Docker and Jupyter to Spread Insights",
      `Our team has the mission of taking the sudden out of sudden cardiac arrest (SCA) that often ends in death. To address this lofty goal, we combine talents in signal processing, machine learning and software engineering from teams in Asia, the middle east and the US. We use Docker and the Python ecosystem to facilitate this synergy. I will talk about one solution in which we leverage these technologies to distinguish typical heart rhythms from potentially harmful ones.`
    ),
    new Presentation(
      "Lorien Rensing",
      "On the Down Low - In Praise of Ignoring Your Projects",
      `"Project DL" is my team's code name for the time we have blocked off in our calendars every Friday afternoon to work on projects on the down low. As long as the project was technical in nature, we have free reign to do whatever we want: learn a new technology, pay down some technical debt, work on a side project, or even keep working on our official projects. Over the past several months, we've learned a lot. We've had some DL code make it into production, improved some processes, and found some things that weren't as cool as we originally thought they were. We'll cover what worked well and what didn't work so well, so you too can start your own "Project DL".`
    ),
    new Presentation(
      "Tom Podnar",
      "Perspectives on Technical Confidence - aka - It Must be a Network Problem...",
      `Seldom do we ever find an IT / software development team that lacks in hubris of their technical confidence. From large to small teams, this trait abounds from engineers to managers.

  <br />
  <br />

  This story looks at how a team relying -less- on facts and more on their technical confidence‚ was heading quickly in the wrong direction.

  <br />
  <br />

  This is a classic tale of shortfalls in system resource and performance management planning for a custom developed software solution and the resulting subsequent significant impact on systems infrastructure and its scalability.

  <br />
  <br />

  Everyone from software developers, systems engineers and managers will find something of value to take away from this story's presentation."`
    ),
    new Presentation(
      "Kim Hardy",
      "Know Thyself",
      `In The Matrix, when Oracle asks Neo if he thinks he is "The One", he says he doesn't know. In reply, she points to a sign in Latin that translates, "Know Thyself" saying, You are who you know you are (I summarize). Nero's self image was so radically different than who he actually was, he could not fathom it. He could not know it. But Oracle recognized his potential and gave him opportunities (i.e. adventures) that challenged him to discover the person she already knew he was.

  <br />
  <br />

  Many of us do not have teachers, mentors, or managers who see and nurture the potential of who we truly are. How I wish this was the norm. But we do have ourselves. And there are many avenues of self-discovery and self-awareness that can challenge us to be who we already are.

  <br />
  <br />

  Let's get started!`
    ),
    new Presentation(
      "Chris Winters",
      "Feedback loops between tools and culture",
      `The core of DevOps isn't tooling but culture. But tooling and culture can influence each other in both positive and negative ways. I'll go into some examples of this using Docker, CI/CD, and testing.`
    ),
    new Presentation(
      "Penny Schaffer",
      "Interviewing Made Easy with Story-craft",
      `Do you dread interviewing? Do you walk away from them feeling like an idiot, like you blew it? So did I. Let me tell you how I overcame that fear and became an interviewing expert in just a few weeks.

  <br />
  <br />

  There are typically three gates between you and a job.

  <br />
  <br />

  First, the resume. Your resume has to stand out, but how do you make it do that? It's not with fancy paper and professional formatting. I'll explain how to write promises into your resume, and how I restructured my resume in a radical way to draw attention to the promises.

  <br />
  <br />

  Second, the technical screen. The interrogation designed to reveal just how much you don't know. I'll guide you through how delivering on the promises in your resume makes this easy, and teach you how to say, "I don't know," without losing the interviewer's interest.

  <br />
  <br />

  Third, the in-person interview. I'll walk you through you how I take charge of this phase and turn it from scary and unfulfilling to fun through story telling. I'll share some of my techniques for handling the dreaded "questions for me?" part of the interview.

  <br />
  <br />

  By the end of the talk, you'll have learned how to better prepare for the interview phases, how to use stories in the interview process, and how to craft and hone your story library over time.`
    ),
    new Presentation(
      "Chris Steinman, Lauren Silverstein, David Stamm",
      "Leading without a Title",
      `At time of writing, it has been just over one calendar year since the fatal accident in Tempe, AZ. Our story focuses not on the events of March 18, 2018 themselves; rather, we tell the story of Uber ATG's call-to-action immediately after the tragedy. The three presenters are the engineers from the System Safety team who, under the leadership of our Head of Safety, led a top-to-bottom internal review. We retell how our roles changed from scoping ATG's response to the accident into leading our internal teams through the safety review. Through this review and analysis we surfaced key recommended actions. This review is reshaping ATG's path ahead. In this presentation we'll also reflect on leadership (namely how to lead regardless of title), performing thoughtful introspection, and adjusting tactics to accommodate a dynamic environment.`
    ),
    new Presentation(
      "Alison S Alvarez",
      "Adventures in Bug Prevention",
      `
  Developers can't be the only ones to test their own code.
  My worst bugs have been a result of a combination of my own arrogance, laziness and denial. This mindset can be countered by a better system of checks with enough time to leverage additional human brains.

  <br />
  <br />

  Related bugs: any time I have ever said "I'll fix it later"

  <br />
  <br />

  Diversity is key. This is not only true for diversity measures like race, gender and age, but for diversity of job function, way of thinking and level of education. Direct user feedback is key, so is using non-technical staff as surrogates when that is not available. If you want to build something fast, build it with a group of like-minded people. If you want to build it well, bring in a diverse group for the whole process. (Design note: paper prototypes will save you).

  <br />
  <br />

  Related bugs: hand-washing sensors and dark skin; that time we totally messed up click events in our app.

  <br />
  <br />

  Automation will save your sanity.  All teams need to work efficiently and that means writing automated tests to detect errors. Manual testing is a necessary, but expensive part of the process. Make automated an essential part of your engineering process to save on time from human testers.

  <br />
  <br />

  Automate all points of rigidity. If there is a place in your software that will not function without correct input, then it's something that needs an automated test.

  <br />
  <br />

  Common bugs that wasted too much of my youth:
  <br />
  * Divide by zero
  <br />
  * Unexpected character encoding
  <br />
  * Race conditions
  <br />
  * Extra note: Stack Overflow is your friend
  <br />
  <br />

  Related bugs: USS Yorktown divide by zero error, Mars Orbiter Feet vs. Meters, detecting column names for data extracts

  <br />
  <br />

  Finally, the capacity to anticipate bugs is beyond the human imagination. Fail elegantly and with communication to the user. Make sure there are simple easy paths for reporting bugs.

  <br />
  <br />

  Related bugs: the Sims bug reports; Sequel Pro bug reports; our usual data errors`
    ),
    new Presentation(
      "Benjamin Mosior",
      "Agile Is a Disease, but so Is Humanity: Ushering in the Taylorism of Tomorrow for Fun and Profit",
      `Like it or not, the modern software development organization is running on a hidden, reductionist operating system from the 1800's: Frederick Winslow Taylor's theory of Scientific Management. Regardless of an organization's espoused methodology du jour, the fundamental principle of efficiency and a metaphor of humans as parts in a machine pervades its thinking and structure, creating quite a complicated picture. Most implementations of Agile, especially in the enterprise, are no different.

  <br />
  <br />

  "But wait," I hear you say. "Does that mean Agile is good or bad?" Well, I'm afraid I can't tell you. I can only create a grey area where your only option is, "It depends."

  <br />
  <br />

  Let's embark together on a journey to contextualize methodologies like Agile in the rich history of management theory, starting with the story of Taylorism and progressing into a potential future of a new reductionism. We'll discover why the problems of tomorrow will be in many ways different but also the same, as well as why that's probably going to be okay. If you leave this talk feeling a little uncertain about the world but ultimately able to make better sense of it, I will have succeeded.

  <br />
  <br />

  I, for one, welcome our neo-Taylorist overlords.`
    ),
    new Presentation(
      "Craig Lang",
      "Wow, I learned a new programming language and did not even plan on doing so!",
      `Over a period of 15 years I wrote a tool that helped automate some of the mundane portions of my daily development routine. I needed to get some tasks automated for better use of my time.

  <br />
  <br />

  Turns out that I learned a new programming language along the way and it was quite a journey. This talk will share this journey where I simply thought I was writing a tool, but inadvertently learned a new programming language. I talked with colleagues about this new (to me) language. Each new "thing" I needed the tool to do led me to discover new libraries (aka modules in Python) that performed said "thing". I scripted away parts of my activities, never to need perform them manually again.

  <br />
  <br />

  I offer this to all: think of something you do often, can you automate it, maybe with a new language or framework, so that you find yourself not only with a tool that helps you do your thing, but now with knowledge in a new language? That is what my journey was to me, unplanned, but fun and enriching.`
    ),
    new Presentation(
      "Keith Kurak",
      "Who Put React in That? How to Sneak New Tech Into Old Code",
      `There's many talks about the technical aspects of mixing old framework X and new framework Y. We will cover that in a general sense, such as starting one new feature or finding a greenfield within your legacy app. Our main focus will be the more difficult work of getting buy-in from your team, many of whom may have implemented the old framework and are rightly proud of what they did. Change catalysts can gain buy-in by trying it the old way first (so they really know what it's like) and by applying positive pressure gradually, even graciously losing the first few debates. It's important to find a low-risk, high reward place to try something new, and important to show how serious you are and sensitive to the risks you are by putting the hard work in on what the transition looks like. We will explore this topic through two examples successful examples where I introduced React to legacy apps, and one unsuccessful example where I tried the scorched earth approach to force a micro ORM into a stored-proc-heavy project and just made everyone mad.`
    ),
    new Presentation(
      "Justin Ehrlichman",
      "Challenge Accepted: From Janitor to Engineer, My Journey with Mental Illness and Computing",
      `Working in the technology field can be very challenging. Living with severe mental illness can not only be trying, but devastating. Working in this field and having autism and bipolar disorder can be seem insurmountable. I am living proof that dreams can become reality. For the first time, I am sharing my full story. Very few people have heard my struggle, my pain, my triumph, my persistence, my fall from grace, and my recovery. In 2010 I lost my job as a System Support Engineer due in part to my mental illness, and ended up working as a Janitor for the next 5 years. This talk will cover how I got to that place, and how I was able to get to where I am at today. With my story I hope to bring inspiration to others, raise awareness of mental health in the workplace, break stigma, and the importance of getting and staying well.`
    ),
    new Presentation(
      "David Copeland",
      "Programming a Time Machine with an event-based language that uses risk-based testing",
      `We all know that time travel in inherently dangerous. Each trip must be planned precisely, and due to the speed at which the trip occurs, we can't adjust for problems mid-flight we have to have an automated flight plan. Timeline is a programming language developed to make it possible to do this safely, without having to write plans usinng the native machine-code of the time machine. Timeline is entirely event driven, since your flight plan must react to events that occur during your journey to the past. Timeline also discourages most idioms in legacy programming languages with an extreme focus on readability and clarity.

  <br />
  <br />

  Testing flight plans uses a risk-based approach. Instead of creating assertions about expected behavior, you specify the level of risk you are willing to tolerate and the simulator evaluates your flight plan to see if that risk is mitigated. This is unlike most legacy programming language test strategies, but paints a far more accurate picture of how the software will behave in practice.

  <br />
  <br />

  In this talk, we'll see what all this looks like, and you'll be on your way to the past in no time. Or, if time travel isn't your thing, you'll at least have several new ideas for how to write legacy software in your day jobs.`
    ),
    new Presentation(
      "Josh Smith",
      "How to Give Away Your Company's Trade Secrets",
      `Tech is a competitive industry. There's often this perception that to outperform rival companies, you have to keep the details of your processes and tech stack a tightly guarded secret. However for plenty of organizations, sharing your experiences, your successes, and your failures with the world at large can become a competitive advantage in its own way.

  <br />
  <br />

  Blogging is a fantastic way to share this information. A blog gives team members a platform to showcase the work they do for your organization and dive into the technical details of their craft. In this talk, I'll discuss my motivation to start an engineering blog at my company. I'll highlight the steps I took with team members and challenges we overcame to create and maintain the blog. After this presentation, you will have the resources and confidence to start a technical blog at your organization.`
    ),
    new Presentation(
      "Joshua Sager",
      "Managing Chaos: Wrangling Clients and Projects",
      `Managing creative and technical projects can be very challenging. It's a delicate balance of producing the work, showing empathy for client needs, and defending the work order from scope creep. Without that right balance, a project can go from dreamy to a nightmare in a single email. I know because I've received that email.

  <br />
  <br />

  What can be done? How can this project be saved? What can be done to avoid it next time? These are all questions I've asked myself.

  <br />
  <br />

  I started collecting very simple strategies based on my experiences. Approaches that have helped me get back to making the work instead of making things about the work. A compilation of stories and lessons learned from good, bad, and amazing projects. There are tips for starting new projects off on the right foot, processes I've used to turn projects around, approaches for mending strained relationships, and tips for keeping everyone honest. These are methods I use in my daily practice and I'm really excited to share them. It's taken me most of my career to realize that it doesn't have to be so hard and I'm delighted to pass on what I've learned.

  <br />
  <br />

  If you work in a small team and feel like you're imprisoned by a neverending task list with too many moving targets to count. Then this talk is for you.`
    ),
    new Presentation(
      "Anastas Stoyanovsky",
      'The Big Crunch: "Organizational Forgetting" in Microservice-First Development',
      `The team at IBM Watson that designed and implemented the information retrieval components powering Watson Discovery Service took a microservices-first approach in which significant new business requirements were generally addressed by adding new components to the architecture. After one year, as individual components grew to be business critical, we paid off tech debt in what had become business critical components by combining some of them into a larger service. However, implementation details particular to those services were siloed in the minds of different developers who had, to some degree, forgotten them over time without having written documentation, and the emergent combined service suffered from performance problems that could have been foreseen if those individual pieces of knowledge had been surfaced and combined earlier. This could be called a form of "organizational forgetting" that can happen when an agile development team is working with a microservice architecture and when, as is common with agile development, internal documentation is sparse to nonexistent; in our case, the result was a significant nightly outage that took over a week to diagnose and solve. This talk is an evolution of the ensuing post-mortem and team retrospective; the mechanisms leading to this scenario will be recounted and analyzed, and approaches to preventing this type of problem will be discussed.`
    ),
    new Presentation(
      "Michael Scotto",
      "Rihanna Borked my Slackbot: Lessons Learned as My 10%-Time Project Grew into a Critical Business Tool",
      `Working in software quality assurance, it's my job to identify problems and in the Fall of 2016, I saw some huge ones looming on the horizon. My company was selling a great new product, but the process to push any update live for a single client involved six stakeholders and over a dozen brittle, manual steps. Even worse, many of these steps were personally executed by my boss, the head of our tech department, AKA, The One with the Most Valuable Time. Reflecting on the situation, my fear wasn't, What if this product tanks? It was, What if clients really want it? So, in my 10%-time, I took a step toward solving the problem: I automated my boss.

  <br />
  <br />

  That is, I wrote a tool in Python that performed every task my boss had handled, and notified the other stakeholders in Slack. In solving the "Boss's Time" problem, though, I created a new one. I'd inadvertently turned myself into the gatekeeper for the whole process: runner and maintainer of this tool, facilitator of the publish, and, as demand grew, bottleneck extraordinaire.

  <br />
  <br />

  This is the story of two evolutions: first, that of the tool I built, which I rewrote to be a full-fledged Slack chatbot, eventually giving non-technical stakeholders the ability to execute a variety of business processes independently. Second, it's the story of my own evolution as a tester and developer of code, wherein I'll share some of the lessons I learned about the value of being a QA who codes, the difficulty of QAing your own code, and the role of empathy in software development.

  <br />
  <br />

  Oh, and I'll tell you about this one week in the summer of 2017 where our company's love of Rihanna almost wrecked everything.`
    ),
    new Presentation(
      "Graham Yennie",
      "Machine Learning Transformations, Reflections from a Greenfield ML Platform Build",
      `
  Beyond the hype and buzzword bingo in the media surrounding Machine Learning, there are real impacts being made by ML in production. This talk will describe the journey of Lucas Systems into the ML promise-land. This journey starts, as it typically does, with the customer and data. The story begins with how we identified value in the data, prototyped ML models, and how this learning drove us to build a ML platform (spoiler alert: our data distribution is complicated). We'll walk through how open-source tools, like FoundationDB, kubernetes and docker, were leveraged to build a scalable system to allow data science and ML applications to be easily managed and deployed. You'll learn how ML models and data pre-processing applications have been standardized and scaled to service our entire customer base. Finally, we'll show you just how we are leveraging this tech stack to quickly build new features on top of our ML core platform.`
    ),
    new Presentation(
      "M. Scott Ford",
      "Building a Bridge to a Legacy Application - How Hard Can that Be?",
      `My team loves working on legacy code projects. It's all that we do. That's why a friend of mine reached out to us for some help.

  <br />
  <br />

  His startup was building out a universal API across a very fragmented industry with little to no interoperability or standards. Up until now, integrating with the systems in that industry had been pretty easy, because the companies that built them were willing to help.

  <br />
  <br />

  But now he'd found one that wasn't willing to help. There was no obvious API for getting data out of the legacy application so that it could be exposed via his company's API. A big client for his company was riding on his ability to be able to pull this off. He remembered how much I loved a challenge and how much my team loved legacy code, so he figured we were his best shot.

  <br />
  <br />

  The goal was to be able to read from the application's database.

  <br />
  <br />

  In this talk, I'll cover
  <br />
    * the different approaches that we took
  <br />
    * the one we really wanted to try because we thought it would be fun
  <br />
    * the approaches that we needed to try before we could attempt the fun one
  <br />
    * the excitement that we felt while working on it
  <br />
    * the grind toward completion once the big technical hurdle was crossed
  <br />
    * the sense of achievement when we got a read-only solution built
  <br />
    * the hope that we'd get the green light to start working on a read-write solution
  <br />
    * the disappointment when the plug got pulled and we weren't authorized to proceed any further
  <br />
  <br />

  It was a fun journey, and I'd love to be able to share it.`
    ),
    new Presentation(
      "Beth Haubert",
      "Cats, The Musical! Algorithmic Song Meow-ification",
      `I built an application that takes a song's audio and outputs a new audio file with that song's melody **sung by cats**. It's a technical feat. It's hilarious. It's beautiful. It's a new way to waste time on the internet.

  <br />
  <br />

  This talk walks through how Meowifier was built, focusing on three aspects of the build that you might be surprised to learn were unique challenges.
  \n

  <br />
  <br />

  1. Finding a way to obtain the notes of only the melody from a song's audio file.
  No bass line or harmony muddying things, please. The melody is the principal part of a song. If you were listening to 'Bohemian Rhapsody' by _Queen_, the melody would be the part Freddy Mercury is singing. If you were to include the harmonies and bass parts in the meow-ified version, you wouldn't even recognize the resulting song because it would all sound jumbled together. Finding an API for song analysis and melody-extraction was surprisingly difficult.

  <br />
  <br />

  2. Correcting your meow length to match the length of the note in the melody.
  A melody is going to have notes of varying lengths. When you think back to 'Bohemian Rhapsody', Freddy doesn't hold each note for 0.5 seconds each. Some of them are .25 seconds or 0.125 seconds or even 1.5 seconds. But I can't have a meow folder containing meow files of every conceivable length. That would be a bloated monster of a library. Instead, I had to find a tool that could either cut or extend a meow to fill the proper amount of time.

  <br />
  <br />

  3. Creating a multi-octave library of meows.
  That's a lot of meows, and if you hadn't noticed, very few cats meow in the tenor, baritone, or bass ranges. And where does one hire a cat choir to begin with? So I had to make my own custom meow library using some interesting tactics. (If you're imagining me meowing into a microphone with a tuner in hand, for each imaginable meow note, you're not far off!)

  <br />
  <br />

  Conferences are great, but there's only so much information you can digest at a time. At my talk, you'll get a light-hearted break where you can laugh a bit and learn a bit. And maybe you'll get the motivation you need to move forward with your own frivolous side project idea. Also, pictures of my cats.`
    ),
    new Presentation(
      "James Wrubel",
      "A playbook for guaranteed success as a new CTO",
      `The title of this talk is a lie. There's no such thing as a playbook for success as a new CTO. But this story should resonate with anyone who's been tasked with leading organizational or technical change. In the spring of 2011 I applied for a CTO opening at a local EdTech startup called Apangea Learning. I'd never heard of the company before seeing this job post, and I wasn't really looking for a new job anyway, but it's rare that CTO jobs become available so I decided to interview. In retrospect I wish I'd really given more thought to what I'd do if I got the job, because I did. And immediately I was faced with an understaffed team maintaining a buggy platform that didn't scale. Oh, and that first year we landed a contract with the state of Texas to teach math to all 3 million of their students. This talk will cover the journey I went through building a team and replacing the entire platform while also experiencing 27x growth in usage. Come laugh at/learn from the many, many mistakes I made along the way.`
    ),
    new Presentation(
      "Jesse Nesbella",
      "Hello World: A Journey of Starting Over",
      `This will be a breadth not depth talk covering a few projects I’ve worked on. I’ll talk a bit about each projects, I’ll underscore the catalysts that resulted in a redo of the project, I’ll talk about how each rewrite/refactor was approached, and finally distill what went well and what could have gone better each time.`
    ),
  ];

  // build list
  $(document).ready(function() {
    buildPresentations(presentationList, LIST_DOM_SELECTOR, MENU_DOM_SELECTOR);
    $("#back-to-top").click(function() {
      window.scrollTo(0, 0);
    });
  });
});
