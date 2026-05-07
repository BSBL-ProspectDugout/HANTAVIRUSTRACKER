import { HantavirusData, ArticleTopic } from './data-scraper';

/**
 * SEO-Optimized Article Generator
 * Creates original, engaging content based on real hantavirus data
 */

export interface GeneratedArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  keywords: string[];
  category: string;
  publishDate: string;
  author: string;
  readTime: number;
  seoMetadata: {
    metaDescription: string;
    h1: string;
    keywords: string[];
  };
}

/**
 * Article Templates
 */

function generateOutbreakUpdateArticle(topic: ArticleTopic): GeneratedArticle {
  const outbreak = topic.data;
  const date = new Date(outbreak.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const content = `
# ${topic.title}

## Current Situation

A hantavirus outbreak has been confirmed in **${outbreak.location}, ${outbreak.country}** with **${outbreak.cases} confirmed cases** and **${outbreak.deaths} deaths** reported as of ${date}.

## What We Know

- **Location:** ${outbreak.location}
- **Country:** ${outbreak.country}
- **Confirmed Cases:** ${outbreak.cases}
- **Deaths:** ${outbreak.deaths}
- **Case Fatality Rate:** ~${((outbreak.deaths / outbreak.cases) * 100).toFixed(1)}%
- **Source:** ${outbreak.source}

## Outbreak Timeline

The hantavirus outbreak in ${outbreak.location} began when health authorities detected the first case. Since then, the number of confirmed cases has grown to ${outbreak.cases}, with ${outbreak.deaths} fatalities.

## Transmission Risk

Hantavirus is primarily transmitted through contact with infected rodents or their droppings. Person-to-person transmission of hantavirus is rare, though some strains (particularly the Andes virus) have shown limited human-to-human transmission capability.

## Health Authorities' Response

Local health departments and international health organizations including the WHO and CDC are monitoring the situation closely. Recommendations include:

- Avoiding contact with rodents
- Using protective equipment when cleaning contaminated areas
- Proper ventilation when cleaning potential contamination sites
- Seeking immediate medical attention for symptoms

## What are Hantavirus Symptoms?

Early symptoms of hantavirus infection include:
- Fatigue
- Fever (above 101°F)
- Headache
- Muscle aches
- Nausea and vomiting

Later symptoms (4-10 days after exposure):
- Coughing
- Shortness of breath
- Chest pain
- Fluid in lungs

## Prevention Measures

If you live in or travel to ${outbreak.location}:
- Seal cracks and gaps in homes
- Use traps and poison for rodent control
- Store food in airtight containers
- Avoid contact with rodent droppings
- Wear N95 masks when cleaning potentially contaminated areas
- Properly dispose of dead rodents (use gloves)

## Global Context

This outbreak represents the latest in a series of hantavirus cases reported worldwide. Understanding the epidemiology of hantavirus helps public health officials prepare for future outbreaks.

## Seeking Medical Care

Anyone experiencing hantavirus symptoms should seek immediate medical attention. Early diagnosis and supportive care significantly improve survival rates.

---

**Last Updated:** ${new Date().toISOString()}
**Source:** CDC, WHO, Local Health Authorities
`;

  return {
    id: `outbreak-${Date.now()}`,
    title: topic.title,
    slug: topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    content,
    excerpt: `Latest hantavirus outbreak in ${outbreak.location} with ${outbreak.cases} cases and ${outbreak.deaths} deaths. Learn about symptoms, prevention, and health response.`,
    keywords: topic.keywords,
    category: 'Outbreak Updates',
    publishDate: new Date().toISOString(),
    author: 'Hantavirus Tracker Team',
    readTime: 6,
    seoMetadata: {
      metaDescription: `Hantavirus outbreak in ${outbreak.location}: ${outbreak.cases} cases reported. Learn symptoms, prevention, and latest updates.`,
      h1: topic.title,
      keywords: topic.keywords,
    },
  };
}

function generatePreventionGuideArticle(topic: ArticleTopic): GeneratedArticle {
  const data = topic.data as HantavirusData;

  const content = `
# ${topic.title}

## Why Hantavirus Prevention Matters

With ${data.totalCases} confirmed cases of hantavirus globally and a case fatality rate of ${data.statistics.deathRate}%, prevention is critical. There is currently no vaccine or specific treatment for hantavirus pulmonary syndrome, making prevention your best defense.

## Understanding Hantavirus Transmission

Hantavirus is primarily transmitted through:

### 1. **Rodent Droppings & Urine**
The most common transmission route. When infected rodent droppings dry out, they create aerosol particles that can be inhaled.

### 2. **Direct Contact**
Handling infected rodents without protection can lead to infection through cuts or mucous membranes.

### 3. **Contaminated Surfaces**
Touching surfaces contaminated with hantavirus and then touching your face can cause infection.

### 4. **Person-to-Person** (Rare)
Some hantavirus strains, particularly Andes virus, have shown limited person-to-person transmission.

## Comprehensive Prevention Strategies

### Home Environment

**Rodent-Proof Your Home:**
- Seal all cracks and gaps larger than 1/4 inch
- Install door sweeps on exterior doors
- Repair holes in walls, especially around pipes and utilities
- Screen windows and vents
- Store food in sealed containers

**Eliminate Food Sources:**
- Remove pet food before bedtime
- Don't leave garbage outside
- Keep compost bins secure
- Store birdseed in metal containers
- Eliminate clutter where rodents hide

**Use Effective Rodent Control:**
- Snap traps are most effective
- Place traps along walls where rodents travel
- Use peanut butter, dried fruit, or nesting material as bait
- Check traps frequently
- Never use bare hands to handle traps

### Outdoor Protection

**Safe Yard Maintenance:**
- Keep grass cut short
- Remove brush piles and wood stacks
- Store firewood away from home (at least 100 feet)
- Don't allow vegetation to touch house exterior
- Keep outdoor storage areas clean

**Camping & Hiking:**
- Avoid sleeping on bare ground or in rodent-infested areas
- Use tents with intact screens
- Never enter old cabins or sheds
- Avoid contact with wildlife
- Wash hands before eating

### When Cleaning Contaminated Areas

**Proper Cleanup Protocol:**

1. **Ventilate First**
   - Open all doors and windows for 30 minutes
   - Use fans to increase air circulation

2. **Protective Equipment**
   - Wear an N95 mask (properly fitted)
   - Wear disposable gloves (double-glove if possible)
   - Wear eye protection
   - Wear long sleeves and pants

3. **Cleaning Process**
   - Don't sweep or vacuum (creates aerosols)
   - Spray areas with disinfectant first
   - Wipe clean with paper towels
   - Use a spray bottle with bleach solution (10% bleach)
   - Double-bag all contaminated materials

4. **After Cleaning**
   - Remove outer gloves carefully
   - Remove mask by straps only
   - Wash hands and exposed skin thoroughly
   - Leave area well-ventilated for several hours

### Personal Hygiene

- Wash hands frequently, especially before eating
- Avoid touching face, mouth, eyes
- Keep wounds covered
- Don't share utensils, cups, or cigarettes

## Recognizing Symptoms Early

**Act Immediately If You Experience:**
- High fever (above 101°F)
- Severe fatigue
- Muscle aches
- Headache
- Nausea/vomiting
- Followed by cough and shortness of breath

Early treatment in a hospital can significantly improve outcomes.

## Regional Risk Assessment

Hantavirus cases have been reported in:
- United States (Southwest most common)
- Argentina
- Chile
- Canada
- Europe

Check your local health department for current outbreak information in your area.

## Special Populations at Higher Risk

- Farm workers
- Construction workers in contaminated buildings
- Military personnel
- Outdoor enthusiasts
- Lab workers handling rodents

## What NOT To Do

❌ Don't sweep or vacuum infected areas
❌ Don't use bare hands for any cleanup
❌ Don't ignore early symptoms
❌ Don't travel to outbreak areas without precautions
❌ Don't handle dead rodents without protection

## Resources

- CDC Hantavirus Information: cdc.gov/hantavirus
- WHO Health Updates: who.int
- Local Health Department contact information
- Emergency Services: 911 (USA)

## Conclusion

While hantavirus can be serious, understanding transmission routes and following prevention guidelines significantly reduces your risk. Stay informed, stay vigilant, and seek immediate medical care if you suspect exposure.

---

**Last Updated:** ${new Date().toISOString()}
**Category:** Prevention & Safety
**Read Time:** 8 minutes
`;

  return {
    id: `prevention-${Date.now()}`,
    title: topic.title,
    slug: topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    content,
    excerpt: 'Complete guide to preventing hantavirus infection. Learn rodent control, home protection, and cleanup procedures.',
    keywords: topic.keywords,
    category: 'Prevention Guide',
    publishDate: new Date().toISOString(),
    author: 'Hantavirus Tracker Team',
    readTime: 8,
    seoMetadata: {
      metaDescription: 'Hantavirus prevention guide: rodent control, home safety, symptoms, and CDC recommendations to protect yourself.',
      h1: topic.title,
      keywords: topic.keywords,
    },
  };
}

function generateSymptomsArticle(topic: ArticleTopic): GeneratedArticle {
  const content = `
# ${topic.title}

## Why Symptom Recognition Matters

Hantavirus pulmonary syndrome (HPS) is a serious disease with a fatality rate around 17.6%. Early recognition of symptoms and immediate medical care can significantly improve survival outcomes.

## Hantavirus Infection Timeline

### Phase 1: Incubation (1-5 weeks after exposure)
- No symptoms during this period
- Person is not contagious
- Virus is replicating in the body

### Phase 2: Early Symptoms (1-5 days)
- **Fever** - Usually above 101°F
- **Fatigue** - Extreme tiredness
- **Muscle aches** - Especially in thighs, hips, shoulders
- **Headache** - Often severe
- **Chills**
- **Nausea and vomiting**

### Phase 3: Late Symptoms (4-10 days after initial symptoms)
- **Cough**
- **Shortness of breath**
- **Chest pain**
- **Fluid in lungs** (detected on X-ray)
- **Low blood oxygen levels**

## Detailed Symptom Breakdown

### Fever
- Temperature usually exceeds 101°F
- Can spike suddenly
- May come and go
- Respond to fever-reducing medications only temporarily

### Fatigue
- Extreme weakness
- Difficulty performing daily activities
- May be the most prominent symptom
- Can last throughout illness

### Muscle Aches
- **Most common locations:**
  - Thighs
  - Hips
  - Shoulders
  - Lower back
- Pain is often described as severe
- Aggravated by movement

### Respiratory Symptoms
- Appear 4-10 days after initial symptoms
- Include nonproductive cough
- Shortness of breath
- Can progress to severe respiratory distress
- May require hospitalization

## When to Seek Emergency Care

🚨 **Seek immediate medical care if you have:**
- High fever with muscle aches
- Difficulty breathing or shortness of breath
- Chest pain or tightness
- Confusion or disorientation
- Coughing
- Any combination of fever + respiratory symptoms

## Diagnosis

**Your doctor may:**
- Order chest X-ray (shows fluid in lungs)
- Check blood oxygen levels
- Blood tests for hantavirus antibodies
- Tests for other conditions (flu, pneumonia)

## Treatment Options

There is **no specific cure** for hantavirus, but treatment focuses on:

- **Supportive care:**
  - Oxygen therapy
  - IV fluids
  - Monitoring vital signs
  - Managing symptoms

- **Hospital admission:**
  - Most patients require hospitalization
  - Intensive care for severe cases
  - Continuous monitoring

- **Antiviral research:**
  - Ribavirin shows some promise
  - Currently being studied
  - Not yet approved standard treatment

## Risk Factors for Severe Disease

**Higher Risk of Complications:**
- Age over 50
- Immunocompromised
- Pre-existing lung disease
- Late medical care
- Diabetes

## Similar Conditions

Symptoms overlap with other diseases, which is why medical evaluation is crucial:

| Condition | Similar Symptoms | Different |
|-----------|------------------|-----------|
| Influenza | Fever, fatigue, muscle aches | Usually has cough early; less respiratory distress |
| Pneumonia | Fever, cough, breathing issues | Different bacteria/virus typically |
| COVID-19 | Fever, fatigue, respiratory symptoms | Transmission is different |
| Plague | Fever, respiratory symptoms | Different progression |

## What Survivors Say

- Recovery takes weeks to months
- Fatigue can persist long-term
- Most recover fully
- Some have residual shortness of breath
- Early treatment was critical

## Prevention is Key

Since there's no cure, prevention is essential:
- Avoid rodent exposure
- Use protective equipment in contaminated areas
- Maintain good hygiene
- Seek immediate care if symptoms develop

## When to Call Your Doctor

📞 **Call immediately if:**
- You have fever + muscle aches AND work/live in endemic areas
- You have fever + respiratory symptoms
- You may have been exposed to hantavirus
- You have symptoms matching this description

---

**Last Updated:** ${new Date().toISOString()}
**Medical Disclaimer:** This is educational information. Always consult healthcare providers for diagnosis and treatment.
`;

  return {
    id: `symptoms-${Date.now()}`,
    title: topic.title,
    slug: topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    content,
    excerpt: 'Complete guide to hantavirus symptoms: early warning signs, progression timeline, and when to seek emergency care.',
    keywords: topic.keywords,
    category: 'Medical Information',
    publishDate: new Date().toISOString(),
    author: 'Hantavirus Tracker Team',
    readTime: 7,
    seoMetadata: {
      metaDescription: 'Hantavirus symptoms timeline: fever, muscle aches, shortness of breath. Learn when to seek emergency care.',
      h1: topic.title,
      keywords: topic.keywords,
    },
  };
}

/**
 * Main article generator function
 */
export function generateArticles(topics: ArticleTopic[]): GeneratedArticle[] {
  const articles: GeneratedArticle[] = [];

  for (const topic of topics) {
    let article: GeneratedArticle | null = null;

    switch (topic.type) {
      case 'outbreak-update':
        article = generateOutbreakUpdateArticle(topic);
        break;
      case 'prevention-guide':
        article = generatePreventionGuideArticle(topic);
        break;
      case 'symptoms-treatment':
        article = generateSymptomsArticle(topic);
        break;
      // Add more article types as needed
    }

    if (article) {
      articles.push(article);
    }
  }

  return articles;
}

/**
 * Calculate reading time
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
