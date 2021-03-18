import refs from './references';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

checkTheme();

refs.themeSwitchToggle.addEventListener('change', onToggleClick);

function onToggleClick(event) {
  if (event.currentTarget.checked) {
    changeTheme(document.body, Theme.LIGHT, Theme.DARK);
    refs.dotsBox.forEach(dot => {
      changeTheme(dot, Theme.LIGHT, Theme.DARK);
    });
    return;
  }
  changeTheme(document.body, Theme.DARK, Theme.LIGHT);

  refs.dotsBox.forEach(dot => {
    changeTheme(dot, Theme.DARK, Theme.LIGHT);
  });
}

function changeTheme(element, prevTheme, nextTheme) {
  element.classList.remove(prevTheme);
  element.classList.add(nextTheme);
  localStorage.setItem('theme', nextTheme);
}

function checkTheme() {
  if (localStorage.getItem('theme') === Theme.DARK) {
    changeTheme(document.body, Theme.LIGHT, Theme.DARK);
    refs.dotsBox.forEach(dot => {
      changeTheme(dot, Theme.LIGHT, Theme.DARK);
    });
    refs.themeSwitchToggle.checked = true;
  }
}
