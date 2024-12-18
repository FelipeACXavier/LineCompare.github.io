function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

function filesSelected() {
  const fileInput = document.getElementById('file1');
  let feedback = document.getElementById('files');

  if (fileInput.files.length != 2) {
    feedback.innerHTML = `We need two files`
    return;
  }

  feedback.innerHTML = `Comparing <span class="feedback-text">${fileInput.files[0].name}</span> to <span class="feedback-text">${fileInput.files[1].name}</span>`;

  compareFiles();
}

async function compareFiles() {
  const fileInput = document.getElementById('file1');
  const output = document.getElementById('output');

  if (fileInput.files.length != 2) {
    output.textContent = 'Please select two files.';
    return;
  }

  if (!fileInput.files[0] || !fileInput.files[1]) {
    output.textContent = 'Please select both files.';
    return;
  }

  try {
    const file1Content = await readFile(fileInput.files[0]);
    const file2Content = await readFile(fileInput.files[1]);

    const file1Lines = file1Content.split('\n').map(line => line.trim());
    const file2Lines = new Set(file2Content.split('\n').map(line => line.trim()));

    let result = '';
    let lineNumber = 0;
    file1Lines.forEach(line => {
      if (!file2Lines.has(line))
        result += `${lineNumber} - ${line}\n`;
      lineNumber++;
    });

    output.textContent = result;
  } catch (error) {
    output.textContent = `Error: ${error.message}`;
  }
}
