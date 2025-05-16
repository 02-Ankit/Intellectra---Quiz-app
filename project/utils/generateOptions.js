export function generateOptions(correctAnswer) {
    const answer = !isNaN(correctAnswer) ? Number(correctAnswer) : correctAnswer;
    let options = [answer];
  
    if (typeof answer === 'number') {
      const offsets = [
        answer + Math.floor(Math.random() * 5) + 1,
        answer - Math.floor(Math.random() * 5) - 1,
        answer * 2 - Math.floor(Math.random() * 3),
      ];
      options.push(...offsets);
    } else {
      options.push("Alternative 1", "Alternative 2", "Alternative 3");
    }
  
    options = [...new Set(options)];
    while (options.length < 4) {
      options.push(typeof answer === 'number' ? answer + Math.floor(Math.random() * 10) : "Dummy Option");
    }
  
    //two decimal numbers
    options = options.map(opt => {
      if (typeof opt === 'number' && !Number.isInteger(opt)) {
        return opt.toFixed(2);
      }
      return opt;
    });
    return options.sort(() => Math.random() - 0.5);
  }
  
  