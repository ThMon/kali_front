import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { title2 } from "../../styles/global/text";
import { useTranslate } from "../../services/translate/useTranslate";
import { tagCreator } from "./tagCreator";
import CustomButton from "../../design-system/atoms/buttons/customButton";

const TagStepper = () => {
  const [step, setStep] = useState(0);
  const [selectedStep, setSelectedStep] = useState(tagCreator[0]);
  const [seletedTags, setSelectedTags] = useState<string[]>([]);
  const translate = useTranslate();

  return (
    <View style={styles.container}>
      <Text style={title2}>{translate(selectedStep.question)}</Text>
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        {selectedStep.answers.map((answer, index) => (
          <CustomButton
            key={index}
            title={translate(answer.name)}
            buttonStyle={
              seletedTags.includes(answer.keys[0]) ? "validation" : "basic"
            }
            onPress={() => {
              let seletedTagsCopy = [...seletedTags];

              if (seletedTagsCopy.includes(answer.keys[0])) {
                seletedTagsCopy = seletedTagsCopy.filter(
                  (tag) => tag !== answer.keys[0]
                );
              } else {
                seletedTagsCopy = [...seletedTagsCopy, ...answer.keys];
              }

              setSelectedTags(seletedTagsCopy);
              // setStep(step + 1);
              // setSelectedStep(tagCreator[step + 1]);
            }}
          />
        ))}
        <CustomButton
          key={"v"}
          title={"valid"}
          buttonStyle="success"
          onPress={() => {
            setStep(step + 1);
            setSelectedStep(tagCreator[step + 1]);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default TagStepper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 72,
    alignItems: "center",
  },
  scrollview: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 0,
    marginVertical: 24,
    padding: 0,
    width: 310,
  },
});
