export interface SuccessStory {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  fullStory: string;
  image: string;
  date: string;
  animalType: 'dog' | 'cat' | 'other';
  status: 'adopted' | 'fostered' | 'rehabilitated';
}

export const successStories: SuccessStory[] = [
  {
    id: 1,
    slug: "max-journey-home",
    title: "Max's Journey Home",
    excerpt: "Found abandoned in a cardboard box, Max was severely malnourished and scared. After weeks of care, he found his forever family.",
    fullStory: `Max's story began on a cold winter morning when a passerby heard faint whimpering coming from a cardboard box behind a grocery store. Inside, they found a tiny, malnourished puppy barely clinging to life. Max was immediately rushed to our emergency care facility.

When Max arrived, he weighed only 3 pounds and was severely dehydrated. Our veterinary team worked around the clock, providing IV fluids, antibiotics, and gentle nutrition to slowly nurse him back to health. The first few days were critical, but Max showed an incredible will to survive.

Over the following weeks, Max began to transform. His coat became shiny, his eyes bright, and his playful personality emerged. He learned to trust humans again, wagging his tail whenever our volunteers approached. The transformation was nothing short of miraculous.

After two months of rehabilitation, Max was ready for adoption. The Martinez family fell in love with him immediately during their first visit. Today, Max enjoys long walks in the park, playing fetch with the children, and sleeping on his favorite sunny spot by the window. He has become the heart of their home, bringing joy and laughter every day.

Max's journey from a discarded puppy to a beloved family member reminds us why our work is so important. Every animal deserves a chance at love and happiness.`,
    image: "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg",
    date: "February 2025",
    animalType: "dog",
    status: "adopted"
  },
  {
    id: 2,
    slug: "luna-second-chance",
    title: "Luna's Second Chance",
    excerpt: "Rescued from a hoarding situation with 20 other cats, Luna showed incredible resilience and now brings joy to her new family.",
    fullStory: `Luna's rescue was part of one of the most challenging cases we've ever handled. When authorities contacted us about a hoarding situation involving over 20 cats, we knew we were in for a difficult operation. The conditions were heartbreaking – cats living in filth, many sick and scared.

Luna was found hiding in a dark corner, her beautiful gray coat matted and her eyes filled with fear. She had never known human kindness and was terrified of any contact. Unlike some of the other cats, Luna showed signs of severe social anxiety, making her rehabilitation particularly challenging.

Our dedicated foster volunteers worked patiently with Luna for months. They started by simply sitting near her enclosure, speaking softly and offering treats. Gradually, Luna began to trust. The first time she allowed a gentle touch was a breakthrough moment that brought tears to everyone's eyes.

The transformation took nearly six months, but Luna slowly learned that humans could be kind. She began to purr, play with toys, and even seek attention. Her personality blossomed – she was gentle, intelligent, and surprisingly affectionate once she felt safe.

When the Thompson family met Luna, it was clear they were meant to be together. They had experience with shy cats and were willing to continue her healing journey. Today, Luna rules her new home with quiet grace, enjoying sunny windowsills and gentle chin scratches. She has taught her new family that love and patience can heal even the deepest wounds.`,
    image: "https://images.pexels.com/photos/3726315/pexels-photo-3726315.jpeg",
    date: "April 2025",
    animalType: "cat",
    status: "adopted"
  },
  {
    id: 3,
    slug: "rocky-recovery",
    title: "Rocky's Recovery",
    excerpt: "Found with a severely injured leg after being hit by a car, Rocky made a full recovery and now runs and plays like never before.",
    fullStory: `Rocky's story is one of resilience and the power of advanced veterinary care. He was found lying by the roadside, his right hind leg badly mangled from what appeared to be a hit-and-run accident. Good Samaritans rushed him to our emergency facility, where our veterinary team immediately went to work.

The initial prognosis was grim. Rocky's leg was severely fractured in multiple places, and there was concern about nerve damage. Our veterinarian, Dr. Sarah Chen, made the difficult decision to attempt a complex surgical reconstruction rather than amputation, believing Rocky had the spirit to overcome this challenge.

The surgery lasted four hours and required the insertion of multiple pins and plates to reconstruct Rocky's shattered leg. Post-surgery, Rocky faced months of restricted movement, physical therapy, and careful monitoring. Many doubted whether he would ever walk normally again, but Rocky seemed determined to prove them wrong.

Physical therapy began slowly with underwater treadmill sessions to reduce stress on the healing leg. Rocky approached each session with determination, his tail wagging even during the most challenging exercises. Our physical therapist, Maria, worked with him three times a week, gradually increasing the intensity as his leg healed.

Six months after his accident, Rocky took his first unassisted steps. The entire rehabilitation team cheered as he walked across the therapy room, his tail wagging with pride. Today, you would never know Rocky was ever injured. He runs, jumps, and plays with the enthusiasm of a puppy, now living happily with the Peterson family who fell in love with his fighting spirit.

Rocky's recovery reminds us that with proper medical care, dedication, and a fighting spirit, even the most serious injuries can be overcome.`,
    image: "https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg",
    date: "June 2025",
    animalType: "dog",
    status: "adopted"
  },
  {
    id: 4,
    slug: "bella-new-beginning",
    title: "Bella's New Beginning",
    excerpt: "An elderly dog abandoned at our shelter found love and comfort in her golden years with a special family.",
    fullStory: `When Bella arrived at our shelter, our hearts broke. At 10 years old, this gentle Golden Retriever had been surrendered by her family who said they "didn't have time for an old dog anymore." Bella's eyes reflected confusion and sadness as she watched her former family walk away without looking back.

Senior dogs often have the hardest time finding new homes, and we knew Bella's age would be a challenge. She had some arthritis in her hips and moved a bit slower than younger dogs, but her sweet disposition and gentle nature made her a staff favorite. Bella seemed to understand that she needed to be patient and wait for the right family.

For three months, Bella watched as younger dogs found homes while she remained in her kennel. She never lost her gentle demeanor, greeting every visitor with a hopeful tail wag and patient eyes. Our volunteers made sure she received extra attention, long walks, and plenty of love while we searched for her perfect match.

Then came the day when the Henderson family visited. They were specifically looking for an older dog to be a companion for their recently retired lifestyle. When they met Bella, the connection was immediate. Mrs. Henderson later said she saw wisdom and gratitude in Bella's eyes that touched her heart.

Bella's adoption day was emotional for everyone. After months of waiting, she finally had a family who valued her for exactly who she was. Today, Bella enjoys leisurely walks, afternoon naps in the sunshine, and being the cherished companion she was always meant to be. The Hendersons say Bella brought a special kind of peace and joy to their home that only a senior dog can provide.

Bella's story reminds us that every animal, regardless of age, deserves love and happiness in their golden years.`,
    image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
    date: "March 2025",
    animalType: "dog",
    status: "adopted"
  },
  {
    id: 5,
    slug: "whiskers-healing-journey",
    title: "Whiskers' Healing Journey",
    excerpt: "A badly injured cat found strength through love and medical care, becoming a therapy animal for other rescued pets.",
    fullStory: `Whiskers came to us in the worst condition we had ever seen. Found in an abandoned building, this orange tabby had suffered severe burns covering 40% of his body. The injuries were so extensive that many questioned whether it was humane to attempt treatment, but something in Whiskers' eyes told us he wanted to fight.

The treatment plan was intensive and expensive. Daily wound cleaning, specialized bandages, pain management, and round-the-clock monitoring were required for months. Our veterinary team, led by Dr. Michael Rodriguez, pioneered new treatment protocols specifically for Whiskers' unique case.

The healing process was slow and sometimes setbacks occurred. There were days when Whiskers seemed to lose hope, refusing food and withdrawing from contact. Our staff took turns staying overnight with him, offering comfort and ensuring he knew he wasn't alone in his fight.

Gradually, new fur began to grow where the burns had healed. Whiskers' personality emerged – playful, affectionate, and surprisingly resilient. He seemed to understand that many people had worked hard to save his life, and he began to purr whenever anyone approached his recovery enclosure.

As Whiskers healed physically, we noticed something remarkable. He had a calming effect on other injured animals brought to our facility. Newly rescued pets seemed to relax in his presence, as if his survival story gave them hope. We began bringing Whiskers to visit other animals during their recovery, and his therapeutic presence became legendary among our staff.

Today, Whiskers serves as our official therapy cat, helping comfort newly rescued animals while they heal. He lives in our facility's recovery wing, where he has become a symbol of hope and resilience. His story proves that sometimes the most broken souls can become the strongest healers.`,
    image: "https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg",
    date: "January 2025",
    animalType: "cat",
    status: "rehabilitated"
  },
  {
    id: 6,
    slug: "charlie-family-reunion",
    title: "Charlie's Family Reunion",
    excerpt: "A lost dog's microchip led to an emotional reunion with his family after months of searching and hoping.",
    fullStory: `Charlie's story began not with abandonment or abuse, but with every pet owner's worst nightmare – a beloved family member going missing. This energetic Border Collie had escaped from his yard during a thunderstorm and disappeared without a trace.

For three months, the Johnson family searched tirelessly. They posted flyers, checked shelters daily, and followed up on every possible sighting. Their two young children asked about Charlie every day, and the family's hope was beginning to fade when they received a call that would change everything.

Charlie had been brought to our shelter by a kind stranger who found him wandering along a busy highway, thin and scared but uninjured. Our first step was always to scan for a microchip, and when the scanner beeped, our hearts raced. The chip was registered to the Johnson family.

The reunion phone call was one of the most joyful moments our staff had ever experienced. Mrs. Johnson's sobs of relief and joy were audible throughout our facility. The family arrived within an hour, and Charlie's reaction was pure magic – he practically launched himself into the children's arms, his entire body wiggling with excitement.

Through tears of happiness, the Johnsons told us how Charlie had been their children's constant companion and how his disappearance had left a hole in their hearts. They had never given up hope, checking our website daily and calling multiple shelters in the surrounding areas.

Charlie's story had a perfect ending, but it also serves as a powerful reminder about the importance of microchipping pets. That tiny chip, smaller than a grain of rice, made the difference between a family's permanent heartbreak and their joyful reunion.

Today, Charlie is back where he belongs, and the Johnson family has become strong advocates for pet microchipping, sharing their story to help other families avoid the heartache they experienced.`,
    image: "https://images.pexels.com/photos/1024403/pexels-photo-1024403.jpeg",
    date: "May 2025",
    animalType: "dog",
    status: "adopted"
  }
];

export const getStoryBySlug = (slug: string): SuccessStory | undefined => {
  return successStories.find(story => story.slug === slug);
};

export const getFeaturedStories = (count: number = 6): SuccessStory[] => {
  return successStories.slice(0, count);
};
