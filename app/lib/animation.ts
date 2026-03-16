import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

// Фабричная функция для создания анимаций с изолированным splitInstance
export function createTextAnimation() {
  let splitInstance: SplitText | null = null;

  function onEnter(el: Element, done: () => void) {
    const element = el as HTMLElement;

    // Очищаем предыдущий split если есть
    if (splitInstance) {
      splitInstance.revert();
      splitInstance = null;
    }

    // Разделяем текст на слова и символы, чтобы переносились только слова
    splitInstance = SplitText.create(element, { type: "words,chars" });

    // Анимация появления: от начального состояния к текущему
    gsap.from(splitInstance.chars, {
      duration: 1,
      y: 200,
      autoAlpha: 0,
      stagger: 0.05,
      ease: "power3.out",
      onComplete: done
    });
  }

  function onLeave(el: Element, done: () => void) {
    const element = el as HTMLElement;

    // Используем существующий split или создаем новый
    let split = splitInstance;
    if (!split) {
      split = SplitText.create(element, { type: "words,chars" });
    }

    // Анимация ухода: от текущего состояния к конечному (обратная анимация)
    gsap.to(split.chars, {
      duration: 1,
      y: 200,
      autoAlpha: 0,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: () => {
        // Восстанавливаем оригинальный текст
        if (split) {
          split.revert();
        }
        splitInstance = null;
        done();
      }
    });
  }

  return {
    onEnter,
    onLeave
  };
}
