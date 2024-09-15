export class ModalManager {
  protected setStage: React.Dispatch<React.SetStateAction<number>>;

  constructor(setStage: React.Dispatch<React.SetStateAction<number>>) {
    this.setStage = setStage;
  }

  open(stage: number) {
    this.setStage(stage);
  }

  close() {
    this.setStage(-1);
  }

  next() {
    this.setStage((prev) => prev + 1);
  }

  back() {
    this.setStage((prev) => prev - 1);
  }
}
