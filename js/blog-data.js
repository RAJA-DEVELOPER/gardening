/* ============================================================
   BOTANICAL LIFESTYLE — BLOG POST DATA STORE
   blog-data.js — Single source of truth for blog content.
   Rendered dynamically by blog-details.js on blog-details.html.
   ============================================================ */

'use strict';

window.BLOG_POSTS = window.BLOG_POSTS || {};

const ELENA = {
  name: 'Elena Romano',
  role: 'Co-Founder & Head Botanist',
  avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=160&h=160&q=80&auto=format&fit=crop&crop=face',
  bio: 'Elena is Botanica\'s co-founder and head botanist with over 15 years of experience in horticultural science, biophilic design, and sustainable growing. She holds a BSc in Plant Biology from the University of Bologna and has been featured in The Guardian, Wallpaper*, and Kinfolk Magazine.'
};

const SOPHIE = {
  name: 'Sophie Laurent',
  role: 'Lead Horticulturalist',
  avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=160&h=160&q=80&auto=format&fit=crop&crop=face',
  bio: 'Sophie is Botanica\'s lead horticulturalist with a decade of hands-on experience across ornamental, edible, and restored-landscape gardens. She specialises in soil science and propagation and leads our weekend gardening workshops.'
};

const KAI = {
  name: 'Kai Nakamura',
  role: 'Garden Design Director',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&q=80&auto=format&fit=crop&crop=face',
  bio: 'Kai is Botanica\'s garden design director, creating award-winning interior landscapes for homes, hotels, and restaurants. He trained in landscape architecture in Kyoto and brings a refined Japanese minimalism to every brief.'
};

const AUTHORS = { ELENA, SOPHIE, KAI };

function body(sections, gallery) {
  const html = sections.map(sec => {
    if (sec.blockquote) return `<blockquote>${sec.blockquote.text}<cite>— ${sec.blockquote.cite}</cite></blockquote>`;
    let h = '';
    if (sec.title) h = `<h2 id="${sec.id}">${sec.title}</h2>`;
    const ps = sec.paras.map(p => `<p>${p}</p>`).join('\n');
    let list = '';
    if (sec.list) {
      const tag = sec.listType === 'ol' ? 'ol' : 'ul';
      list = `<${tag}>${sec.list.map(li => `<li>${li}</li>`).join('')}</${tag}>`;
    }
    return h + ps + list;
  }).join('\n');
  const gal = gallery
    ? `<div class="article-gallery">${gallery.map(g => `<img src="${g.src}" alt="${g.alt}" loading="lazy" />`).join('\n')}</div>`
    : '';
  return html + gal;
}

window.BLOG_POSTS = {

  'indoor-botanical-space': {
    title: 'How to Create a Thriving Indoor Botanical Space — A Complete Room-by-Room Guide',
    tag: 'Plant Care Guide',
    category: 'Plant Care',
    excerpt: 'Transform your home into a lush, living sanctuary with our comprehensive guide to layering plants, choosing the right vessels, and creating micro-environments that help every species thrive.',
    date: 'August 12, 2026',
    readTime: '12 min read',
    views: '3,402 views',
    author: AUTHORS.ELENA,
    hero: {
      src: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=1200&q=85&auto=format&fit=crop',
      alt: 'Lush indoor botanical space with layered tropical plants'
    },
    headerBg: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=1600&q=80&auto=format&fit=crop',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&q=80&auto=format&fit=crop', alt: 'Monstera deliciosa in large terracotta pot' },
      { src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&q=80&auto=format&fit=crop', alt: 'Sage green ceramic planter with trailing pothos' },
      { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80&auto=format&fit=crop', alt: 'Layered indoor plant arrangement' }
    ],
    sections: [
      { title: 'Understanding Your Home\'s Micro-Environments', id: 'section-1', paras: [
        'Before you purchase a single plant, spend a week observing how light moves through your home. Note which windows receive direct morning sun, which have bright indirect light all day, and which remain in shadow. This exercise is the single most important thing you can do for your future plant collection.',
        'Most houseplants fall into three light categories: <em>bright indirect</em>, <em>medium light</em>, and <em>low light</em>. Understanding these distinctions prevents the most common mistake new plant parents make — buying beautiful plants that are fundamentally incompatible with their space.'
      ], blockquote: { text: 'The secret to a thriving indoor garden is not a green thumb — it\'s matching each plant to the precise environmental conditions it evolved to love.', cite: 'Sophie Laurent, Lead Horticulturalist, Botanica' } },
      { title: 'The Living Room — Your Botanical Showcase', id: 'section-2', paras: [
        'The living room is your botanical centrepiece. This is where you place your statement plants — large architectural specimens that anchor the space and draw the eye. Think Fiddle Leaf Figs, Bird of Paradise, or a majestic Monstera Deliciosa in a large terracotta pot.'
      ], list: [
        '<strong>Corner anchors:</strong> Use large plants (90cm+) to fill dead corners and add vertical dimension',
        '<strong>Shelf styling:</strong> Trail smaller plants like Pothos or String of Pearls from elevated positions',
        '<strong>Layering:</strong> Combine tall, medium, and groundcover plants in clusters for a natural jungle feel',
        '<strong>Ceramics:</strong> Choose neutral terracotta or sage-green glazed vessels to complement without competing'
      ] },
      { title: 'Bedroom Botanicals — Calm & Air-Purifying', id: 'section-3', paras: [
        'The bedroom should be your sanctuary. Select plants known for their air-purifying and calming properties. <strong>Peace Lilies, Snake Plants, and Pothos</strong> are ideal — they tolerate lower light, produce oxygen, and studies suggest they contribute to better sleep quality by reducing volatile organic compounds in the air.',
        'For your bedside, consider a single, elegant specimen in a handmade ceramic pot. A small <em>Pilea Peperomioides</em> or a delicate fern in a pale sage vessel makes a beautiful, restful composition.'
      ] },
      { title: 'Kitchen & Bathroom — Humidity Lovers', id: 'section-4', paras: [
        'Kitchens and bathrooms offer something most indoor spaces don\'t: natural humidity. This makes them perfect for tropical species that typically struggle in drier environments. Boston Ferns, Orchids, and Calatheas absolutely revel in bathroom conditions with their steam and consistent warmth.',
        'In the kitchen, keep a rotating herb garden on the windowsill — a mix of rosemary, basil, thyme, and mint provides fresh ingredients while filling the space with incredible fragrance.'
      ] },
      { title: 'Soil, Vessels & Drainage — The Foundation of Success', id: 'section-5', paras: [
        'The most overlooked aspect of indoor plant success is the relationship between soil composition, pot material, and drainage. The classic mistake is using heavy, peat-based potting compost in a non-draining vessel — a recipe for root rot that kills more houseplants than any other factor.',
        'At Botanica, we recommend a blend of:'
      ], list: [
        '60% high-quality potting mix',
        '20% perlite (for aeration)',
        '10% coarse sand',
        '10% worm castings (for gentle, slow-release nutrients)'
      ] }
    ]
  },

  'composting-beginners': {
    title: 'Composting for Beginners: 7 Steps to Rich, Dark Gold',
    tag: 'Soil Health',
    category: 'Soil Health',
    excerpt: 'Turn your kitchen and garden waste into incredible, nutrient-dense compost that transforms tired soil into a thriving plant ecosystem.',
    date: 'Aug 10, 2026',
    readTime: '7 min read',
    views: '2,118 views',
    author: AUTHORS.SOPHIE,
    hero: {
      src: 'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=1200&q=85&auto=format&fit=crop',
      alt: 'Composting pile with rich dark soil'
    },
    headerBg: 'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=1600&q=80&auto=format&fit=crop',
    sections: [
      { title: 'Why Composting Matters', id: 'section-1', paras: [
        'Composting is the single highest-impact thing a gardener can do for their soil. Every scrap of kitchen waste you divert from landfill becomes food for a microscopic ecosystem that, in turn, feeds your plants.',
        'Finished compost improves drainage in clay, retains moisture in sand, buffers pH swings, and introduces billions of beneficial microbes to every handful of soil.'
      ], blockquote: { text: 'Compost is not a fertiliser — it is the soil\'s immune system.', cite: 'Sophie Laurent, Lead Horticulturalist, Botanica' } },
      { title: 'Choose Your Composting System', id: 'section-2', paras: [
        'You don\'t need a huge outdoor bin. Choose a system that matches your space and the amount of waste you generate:'
      ], list: [
        '<strong>Cold pile:</strong> The set-and-forget method — stack greens and browns and wait 6-12 months',
        '<strong>Hot pile:</strong> The fastest method — balances greens and browns for temperatures up to 65°C',
        '<strong>Tumbler:</strong> Great for small gardens — easy turning and faster aeration',
        '<strong>Worm bin:</strong> Ideal indoors or on balconies — produces the richest vermicompost of all'
      ] },
      { title: 'The Green and Brown Ratio', id: 'section-3', paras: [
        'The golden rule is roughly <strong>two parts brown to one part green</strong> by volume. Greens (kitchen scraps, grass clippings, coffee grounds) provide nitrogen. Browns (dry leaves, cardboard, straw) provide carbon. Getting this ratio right is what separates rich, dark compost from a stinking, soggy pile.'
      ], list: [
        '<strong>Greens:</strong> Fruit and vegetable scraps, tea bags, coffee grounds, fresh grass',
        '<strong>Browns:</strong> Dried leaves, shredded cardboard, paper, straw, wood shavings',
        '<strong>Avoid:</strong> Meat, dairy, cooked oils, and diseased plant matter'
      ] },
      { title: 'Build the Pile in Layers', id: 'section-4', paras: [
        'Start with a coarse brown base for aeration, then alternate thin layers of greens and browns. Keep everything moist like a wrung-out sponge, and cover the pile to retain heat and moisture.',
        'Turn the pile every one to two weeks to introduce oxygen — the microbes that break down your waste are aerobic, and they work far faster with air.'
      ] },
      { title: 'Harvest Your Gold', id: 'section-5', paras: [
        'Your compost is ready when it is dark, crumbly, and smells like fresh forest floor — typically after three to six months. Sift out any unfinished chunks, return them to the new pile, and work the finished compost into your beds or use it as a top dressing.',
        'Apply a 2-3cm layer twice a year and watch your soil come alive.'
      ] }
    ]
  },

  'summer-planting-calendar': {
    title: 'Your Complete Summer Planting Calendar 2026',
    tag: 'Seasonal Guide',
    category: 'Seasonal',
    excerpt: 'What to plant, when to plant it, and how to prepare your soil for the richest summer harvest ever.',
    date: 'Aug 7, 2026',
    readTime: '10 min read',
    views: '4,905 views',
    author: AUTHORS.ELENA,
    hero: {
      src: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=1200&q=85&auto=format&fit=crop',
      alt: 'Sunlit summer vegetable garden'
    },
    headerBg: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=1600&q=80&auto=format&fit=crop',
    sections: [
      { title: 'Plan Before You Plant', id: 'section-1', paras: [
        'The summer garden rewards planning. Before the first seed goes in, sketch your beds on paper, rotate your crops away from last season\'s families, and check your soil\'s pH and drainage. A half-day of planning saves a full season of frustration.'
      ], blockquote: { text: 'A garden planned on paper in spring is a garden harvested in abundance in autumn.', cite: 'Elena Romano, Co-Founder, Botanica' } },
      { title: 'Early Summer: The Fast Growers', id: 'section-2', paras: [
        'June is all about speed and succession. Radishes, salad leaves, and spinach will go from seed to plate in as little as four weeks, making them perfect for gaps between slower crops.'
      ], list: [
        '<strong>Direct sow:</strong> Radish, lettuce, rocket, spring onion, beetroot, carrots',
        '<strong>Transplant:</strong> Tomatoes, peppers, aubergines, courgettes, and basil',
        '<strong>Succession:</strong> Re-sow salads every two weeks for a continuous harvest'
      ] },
      { title: 'Mid-Summer: Feed & Protect', id: 'section-3', paras: [
        'By July your beds are full and demanding. Mulch thickly to hold moisture, water deeply and less often to encourage deep roots, and stay ahead of pests with regular inspection rather than reactive spraying.',
        'Feed fruiting crops weekly with a potassium-rich liquid feed to boost flowering and fruit set.'
      ] },
      { title: 'Late Summer: The Second Wave', id: 'section-4', paras: [
        'As early crops are cleared, plant a second wave of fast autumn crops: carrots, turnips, kohlrabi, and leafy brassicas. Late July and August sowings extend your harvest well into October.',
        'Also start winter squashes and pumpkins now — they need the late-season heat to ripen properly.'
      ] },
      { title: 'Keep Records', id: 'section-5', paras: [
        'The best tool a gardener owns is a notebook. Record what you sowed, when, how it performed, and what the weather did. Next year\'s calendar writes itself.'
      ] }
    ]
  },

  'drought-tolerant-plants': {
    title: '10 Stunning Drought-Tolerant Plants That Need Almost No Water',
    tag: 'Plant Guide',
    category: 'Plant Care',
    excerpt: 'Beautiful gardens don\'t require constant watering. Discover our favourite hardy species that thrive on neglect.',
    date: 'Jul 29, 2026',
    readTime: '8 min read',
    views: '3,861 views',
    author: AUTHORS.KAI,
    hero: {
      src: 'https://images.unsplash.com/photo-1526397751294-331021109fbd?w=1200&q=85&auto=format&fit=crop',
      alt: 'Drought tolerant succulents and grasses'
    },
    headerBg: 'https://images.unsplash.com/photo-1526397751294-331021109fbd?w=1600&q=80&auto=format&fit=crop',
    sections: [
      { title: 'Designing for Low Water', id: 'section-1', paras: [
        'Drought-tolerant planting is about working with your climate instead of against it. Group plants by their water needs, build rich organic soil that holds moisture, and use a thick mulch to stop evaporation before it begins.'
      ], blockquote: { text: 'The most sustainable garden is the one you barely have to water.', cite: 'Kai Nakamura, Garden Design Director, Botanica' } },
      { title: 'The Classic Succulents', id: 'section-2', paras: [
        'Succulents store water in their fleshy leaves and look stunning in contemporary planting schemes. Their sculptural forms bring architectural interest with zero maintenance.'
      ], list: [
        '<strong>Sempervivum</strong> (houseleek) — hardy down to -20°C, perfect for green roofs',
        '<strong>Sedum</strong> — groundcover that flowers prolifically for pollinators',
        '<strong>Agave</strong> — the dramatic statement plant for hot, dry borders',
        '<strong>Echeveria</strong> — rosette-forming favourites for containers'
      ] },
      { title: 'Perennials That Never Flinch', id: 'section-3', paras: [
        'A surprising number of perennials thrive on little water once established. Their deep taproots pull moisture from far below the surface and their grey, furry, or waxy leaves minimise water loss.'
      ], list: [
        '<strong>Lavender</strong> — aromatic, pollinator-friendly, and drought-hardy',
        '<strong>Echinacea</strong> — prairie natives with striking summer colour',
        '<strong>Russian Sage</strong> — silver foliage with airy blue flower spikes',
        '<strong>Yarrow</strong> — tough, versatile, and a magnet for beneficial insects'
      ] },
      { title: 'Establishment is Everything', id: 'section-4', paras: [
        'All drought-tolerant plants need regular water for their first season while their root systems establish. After that, water deeply but rarely — the most common mistake is killing these plants with kindness.'
      ] }
    ]
  },

  'organic-vs-synthetic-fertilizers': {
    title: 'Organic vs Synthetic Fertilizers: The Definitive 2026 Guide',
    tag: 'Fertilizers',
    category: 'Soil & Compost',
    excerpt: 'We break down the science, cost, environmental impact, and results of organic and synthetic fertilizers side by side.',
    date: 'Jul 21, 2026',
    readTime: '9 min read',
    views: '2,740 views',
    author: AUTHORS.SOPHIE,
    hero: {
      src: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=1200&q=85&auto=format&fit=crop',
      alt: 'Hand holding rich soil with compost'
    },
    headerBg: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=1600&q=80&auto=format&fit=crop',
    sections: [
      { title: 'The Core Difference', id: 'section-1', paras: [
        'Both organic and synthetic fertilisers deliver the same NPK nutrients to plants — the difference lies in how, and how quickly, they release them. Synthetic fertilisers feed the plant directly in water-soluble form. Organic fertilisers feed the soil, which in turn feeds the plant.'
      ], blockquote: { text: 'Synthetic fertiliser feeds the plant; organic fertiliser builds the soil that feeds the plant.', cite: 'Sophie Laurent, Lead Horticulturalist, Botanica' } },
      { title: 'What Organic Brings to the Table', id: 'section-2', paras: [
        'Organic fertilisers improve soil structure, water retention, and microbial life over time. Nutrients release slowly as microorganisms break organic matter down — this reduces the risk of burning and makes for steadier, more resilient growth.'
      ], list: [
        '<strong>Compost</strong> — the all-round soil builder',
        '<strong>Worm castings</strong> — gentle, complete, and impossible to over-apply',
        '<strong>Blood & bone</strong> — fast-acting organic nitrogen and phosphorus',
        '<strong>Seaweed</strong> — trace minerals and natural growth hormones'
      ] },
      { title: 'Where Synthetics Excel', id: 'section-3', paras: [
        'Synthetic fertilisers are precise, cheap, and fast. When a plant shows a specific deficiency — yellowing leaves, for example — a synthetic feed corrects it within days. For container plants and quick correction, they are hard to beat.'
      ], list: [
        '<strong>Precise NPK ratios</strong> for targeted feeding',
        '<strong>Rapid uptake</strong> — visible results within days',
        '<strong>Low cost per dose</strong> for large areas'
      ] },
      { title: 'The Environmental Trade-Off', id: 'section-4', paras: [
        'The main criticism of synthetics is leaching: excess soluble nutrients wash out of the soil and into waterways, causing algal blooms. Organic fertilisers release slowly and bind to soil particles, greatly reducing this risk.',
        'Our recommendation? Use organic as the foundation of your soil health programme, and keep a balanced synthetic feed on hand for targeted, rapid corrections.'
      ] }
    ]
  },

  'perfect-pot-guide': {
    title: 'The Art of Choosing the Perfect Pot for Every Plant',
    tag: 'Pots & Planters',
    category: 'Pots & Planters',
    excerpt: 'Material, drainage, size, and aesthetics — the complete guide to matching your plants with their perfect ceramic home.',
    date: 'Jul 14, 2026',
    readTime: '6 min read',
    views: '1,953 views',
    author: AUTHORS.KAI,
    hero: {
      src: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=1200&q=85&auto=format&fit=crop',
      alt: 'Assorted ceramic plant pots'
    },
    headerBg: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=1600&q=80&auto=format&fit=crop',
    sections: [
      { title: 'Material Matters', id: 'section-1', paras: [
        'The material of your pot is not decoration — it controls moisture, temperature, and aeration at the root zone. Matching material to plant is the difference between thriving and merely surviving.'
      ], list: [
        '<strong>Terracotta:</strong> Porous walls breathe and wick away excess moisture — perfect for drought-lovers',
        '<strong>Glazed ceramic:</strong> Retains moisture — ideal for tropicals and moisture-lovers',
        '<strong>Plastic:</strong> Lightweight and cheap, but non-porous — use only with careful drainage',
        '<strong>Fabric:</strong> Superior aeration for root-bound outdoor plants'
      ] },
      { title: 'Drainage is Non-Negotiable', id: 'section-2', paras: [
        'Root rot is the number one killer of potted plants, and it is almost always caused by poor drainage. Every pot needs at least one drainage hole, a layer of broken pot or gravel at the base, and a free-draining potting mix.'
      ], blockquote: { text: 'A pot without drainage is not a pot — it is a coffin for your roots.', cite: 'Kai Nakamura, Garden Design Director, Botanica' } },
      { title: 'Size It Right', id: 'section-3', paras: [
        'Choose a pot roughly 2-4cm wider than the root ball. A pot that is too large holds water that the roots cannot reach, while a pot that is too small restricts growth and dries out rapidly. Repot every 18-24 months as your plant matures.'
      ] },
      { title: 'The Aesthetic Layer', id: 'section-4', paras: [
        'Finally, the part we all love. Neutral terracotta and sage tones complement green foliage without competing. For statement plants, let the vessel contrast boldly with the foliage colour — a deep forest glaze against a pale variegated plant is pure magic.'
      ] }
    ]
  },

  'balcony-garden-design': {
    title: 'Maximising Your Balcony Garden: 5 Design Secrets',
    tag: 'Garden Design',
    category: 'Garden Design',
    excerpt: 'Even the smallest balcony can become a lush retreat. Our designers reveal the vertical, layered approaches that make it work.',
    date: 'Jul 7, 2026',
    readTime: '7 min read',
    views: '3,102 views',
    author: AUTHORS.KAI,
    hero: {
      src: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&q=85&auto=format&fit=crop',
      alt: 'Small balcony transformed into a green garden'
    },
    headerBg: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1600&q=80&auto=format&fit=crop',
    sections: [
      { title: 'Think Vertically', id: 'section-1', paras: [
        'On a balcony, floor space is precious and vertical space is free. Wall-mounted planters, tiered stands, and trailing plants along railings triple your growing area without using a centimetre of floor.'
      ], list: [
        '<strong>Trellises:</strong> Train climbers like jasmine and clematis up blank walls',
        '<strong>Rail planters:</strong> Convert your railing into a planting ledge',
        '<strong>Vertical towers:</strong> Pocket planters for herbs and salad leaves',
        '<strong>Hanging baskets:</strong> Trailers and ferns at eye level'
      ] },
      { title: 'Layer Like an Interior Designer', id: 'section-2', paras: [
        'Good balcony gardens use the same layering as good interiors: a tall focal point at the back, bushy mid-height fillers, and trailing plants cascading at the front. Three layers is enough to create real depth.'
      ], blockquote: { text: 'A balcony is a room without a roof. Design it like one.', cite: 'Kai Nakamura, Garden Design Director, Botanica' } },
      { title: 'Play the Wind Game', id: 'section-3', paras: [
        'High-rise balconies suffer from constant wind, which dries soil and shreds delicate foliage. Choose wind-tolerant species, stake taller plants, and protect the balcony with a windbreak of grasses or screening.'
      ] },
      { title: 'Weight & Safety First', id: 'section-4', paras: [
        'Always check your balcony\'s weight limit before going plant-heavy. Use lightweight pots (fibreglass, fabric, or plastic), group heavy containers near load-bearing walls, and secure every planter against strong gusts.'
      ] }
    ]
  },

  'pruning-101': {
    title: 'Pruning 101: Shape Your Plants Like a Pro',
    tag: 'Plant Care',
    category: 'Plant Care',
    excerpt: 'Learn the essential cuts, the right timing, and the tools that keep every shrub, tree, and vine healthy and beautiful.',
    date: 'Aug 5, 2026',
    readTime: '6 min read',
    views: '2,240 views',
    author: AUTHORS.SOPHIE,
    hero: {
      src: 'https://images.unsplash.com/photo-1516048015710-7a3b4c86be43?w=1200&q=85&auto=format&fit=crop',
      alt: 'Hand pruning shears trimming a shrub'
    },
    headerBg: 'https://images.unsplash.com/photo-1516048015710-7a3b4c86be43?w=1600&q=80&auto=format&fit=crop',
    sections: [
      { title: 'Why We Prune', id: 'section-1', paras: [
        'Pruning is not about punishment — it is about direction. A well-timed cut channels the plant\'s energy into the growth you want, opens the canopy to light and air, and removes dead or diseased wood before it spreads.'
      ] },
      { title: 'The Three Essential Cuts', id: 'section-2', paras: [
        'Almost all pruning comes down to three cuts: the thinning cut (remove a branch at its base), the heading cut (shorten a branch to a bud), and the renewal cut (remove old stems to ground level). Master these and you can shape almost anything.'
      ], list: [
        '<strong>Thinning</strong> — removes congestion, improves light and airflow',
        '<strong>Heading back</strong> — controls size and encourages bushy growth',
        '<strong>Renewal</strong> — keeps shrubs vigorous by replacing old wood'
      ] },
      { title: 'Timing is Everything', id: 'section-3', paras: [
        'Prune spring-flowering shrubs immediately after they finish blooming, and summer-flowering shrubs in late winter. Hedges get light trims through the growing season. When in doubt, wait — wrong-timed hard pruning can cost you a season of flowers.'
      ] },
      { title: 'Sharp Tools, Clean Cuts', id: 'section-4', paras: [
        'A sharp, clean blade makes a healing cut; a blunt one tears. Clean your secateurs between plants with rubbing alcohol to avoid spreading disease, and always cut at a 45° angle just above an outward-facing bud.'
      ] }
    ]
  },

  'monstera-care-guide': {    title: 'Complete Monstera Care Guide 2026',
    tag: 'Plant Care',
    category: 'Plant Care',
    excerpt: 'Everything you need to keep your Monstera deliciosa fenestrated, glossy, and growing to its full, dramatic potential.',
    date: 'Jul 31, 2026',
    readTime: '8 min read',
    views: '5,118 views',
    author: AUTHORS.ELENA,
    hero: {
      src: 'https://images.unsplash.com/photo-1611211232932-da3113c5b960?w=1200&q=85&auto=format&fit=crop',
      alt: 'Monstera deliciosa with large fenestrated leaves'
    },
    headerBg: 'https://images.unsplash.com/photo-1611211232932-da3113c5b960?w=1600&q=80&auto=format&fit=crop',
    sections: [
      { title: 'The Light Sweet Spot', id: 'section-1', paras: [
        'Monstera wants bright, indirect light — the kind found a metre or two back from an east or west window. Too little light and the leaves stay small, solid, and unfenestrated. Direct sun scorches the foliage.'
      ], blockquote: { text: 'The holes in a Monstera\'s leaves are not decoration — they are the plant\'s clever adaptation for letting light through to lower leaves.', cite: 'Elena Romano, Co-Founder, Botanica' } },
      { title: 'Watering & Humidity', id: 'section-2', paras: [
        'Water when the top 5cm of soil is dry — roughly every 7-10 days. Monstera is a tropical aroid that loves humidity, so mist regularly, group with other plants, or set the pot on a pebble tray filled with water.'
      ], list: [
        '<strong>Signs of overwatering:</strong> yellowing lower leaves, soggy soil',
        '<strong>Signs of underwatering:</strong> brown crispy leaf edges, drooping stems',
        '<strong>Best practice:</strong> water deeply, then let the top of the soil dry out'
      ] },
      { title: 'Support & Climbing', id: 'section-3', paras: [
        'In the wild, Monstera climbs trees, and its leaves grow larger as it climbs. Give yours a moss pole or trellis to scale — leaves that reach the top can grow to 60cm+ with more fenestrations than you\'ll know what to do with.'
      ] },
      { title: 'Propagate to Multiply', id: 'section-4', paras: [
        'Monstera roots easily from stem cuttings. Cut below a node, pop the cutting in water or moist sphagnum, and within weeks you\'ll have a rooted plant to share. One happy Monstera can become many.'
      ] }
    ]
  },

  'orchid-blooming': {
    title: 'Why Your Orchid Isn\'t Blooming (And How to Fix It)',
    tag: 'Plant Care',
    category: 'Plant Care',
    excerpt: 'The three most common reasons orchids refuse to rebloom — and exactly how to coax those spectacular flower spikes back.',
    date: 'Jul 25, 2026',
    readTime: '6 min read',
    views: '4,220 views',
    author: AUTHORS.ELENA,
    hero: {
      src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=85&auto=format&fit=crop',
      alt: 'Phalaenopsis orchid in bloom'
    },
    headerBg: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1600&q=80&auto=format&fit=crop',
    sections: [
      { title: 'The Rebloom Mystery', id: 'section-1', paras: [
        'Orchids are not difficult to keep alive — they are difficult to persuade to rebloom. If your phalaenopsis has gorgeous leaves but never flowers, the culprit is almost always one of three things: light, temperature drop, or feeding.'
      ], blockquote: { text: 'Orchids bloom when they are reminded of the seasons, not when they are pampered.', cite: 'Elena Romano, Co-Founder, Botanica' } },
      { title: 'Give Them More Light', id: 'section-2', paras: [
        'The number one cause of stubbornly vegetative orchids is insufficient light. These are understory plants that want bright, filtered light — an east-facing windowsill is ideal. Dark green, drooping leaves are a reliable sign your plant is starving for photons.'
      ] },
      { title: 'The Night-Time Temperature Drop', id: 'section-3', paras: [
        'Phalaenopsis orchids need a 10-15°C drop between day and night temperatures for 2-4 weeks to trigger flower spike initiation. Move the plant to a cooler room, or open a window at night in autumn, and the spike usually follows within a month.'
      ] },
      { title: 'Feed at the Right Time', id: 'section-4', paras: [
        'Feed weakly, weekly during the growing season with a balanced orchid fertiliser. As flower spikes begin to form, switch to a high-phosphorus bloom booster and watch the buds develop.'
      ], list: [
        '<strong>Spring-Summer:</strong> balanced feed, every other watering',
        '<strong>Autumn:</strong> introduce the night-time temperature drop',
        '<strong>Spike emergence:</strong> switch to high-phosphorus feed',
        '<strong>Winter:</strong> reduce feeding, maintain humidity'
      ] }
    ]
  }
};
