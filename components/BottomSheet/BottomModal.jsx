import Modal from "react-native-modal";

function BottomModal() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="모달 보이기" onPress={toggleModal} />
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text>모달 내용</Text>
          <Button title="닫기" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}
