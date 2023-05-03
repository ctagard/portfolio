import { useState, useEffect } from 'react';

const parseEducation = (mdContent) => {
  const education = [];
  const lines = mdContent.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      const company = line.substr(3).trim();
      const positionLine = lines[++i]
        .substr(2)
        .split('|')
        .map((s) => s.trim());
      const position = positionLine[0].slice(1, -1);
      const duration = positionLine[1].trim();
      const imageLine = lines[++i];
      const image = imageLine.match(/!\[(.*)\]\((.*)\)/)[2];
      const tags = lines[++i].split(':')[1].trim();
      const badges = [];
      const listItems = [];
      const classes = [];

      while (lines[++i] && !lines[i].startsWith('- Badges:')) {
      }
      while (lines[++i] && lines[i].startsWith('  - ')) {
        const badgeLine = lines[i].substr(4).split('[');
        const badgeName = badgeLine[0].trim();
        const badgeColor = badgeLine[1].split(']')[0].trim();
        badges.push({ name: badgeName, colorScheme: badgeColor });
      }

      while (lines[++i] && lines[i].startsWith('  - ')) {
        listItems.push(lines[i].substr(4));
      }


      while (lines[++i] && (lines[i].startsWith('  - ') || lines[i].startsWith('  # ')) && lines[i] !== '') {
        if (lines[i].includes('#')) {
          const line = lines[i];
          const className = line.substr(3).trim();
          const descriptionLine = lines[++i];
          const description = descriptionLine.substr(4).trim();
          const classBadges = [];
          while (lines[++i] && lines[i].startsWith('  - ') && !lines[i].includes('#')) {
            const badgeLine = lines[i].substr(4).split('[');
            const badgeName = badgeLine[0].trim();
            const badgeColor = badgeLine[1].split(']')[0].trim();
            classBadges.push({ text: badgeName, colorScheme: badgeColor });
          }
          i--;
          console.log("classBadges", classBadges)
          classes.push({
            name: className,
            description: description,
            badges: classBadges
          });
        }
      }
      // Decrement the value of `i` by 1 after the while loop
      i--;


      education.push({
        image,
        company,
        position,
        duration,
        badges,
        listItems,
        classes,
        tags
      });
    }
  }

  return education;
};

const EducationArray = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetch('/content/Education.md')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch markdown content');
        }
        return response.text();
      })
      .then((mdContent) => {
        setEducation(parseEducation(mdContent));
      })
      .catch((error) => {
        console.error('Error fetching markdown content:', error);
      });
  }, []);

  return education;
};

export default EducationArray;
