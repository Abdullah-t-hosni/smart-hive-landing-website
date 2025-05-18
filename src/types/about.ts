export interface IntroSection {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface MissionVisionSubSection {
  image: string;
  description: string;
}

export interface MissionVisionSection {
  title: string;
  description: string;
  subSections: MissionVisionSubSection[];
}

export interface ValueItem {
  title: string;
  subtitle: string;
}

export interface ValuesSection {
  title: string;
  description: string;
  values: ValueItem[];
}

export interface BenefitItem {
  image: string;
  title: string;
  description: string;
}

export interface BenefitsSection {
  title: string;
  description: string;
  benefits: BenefitItem[];
}

export interface AboutPageData {
  introSection: IntroSection;
  missionVisionSection: MissionVisionSection;
  valuesSection: ValuesSection;
  benefitsSection: BenefitsSection;
} 