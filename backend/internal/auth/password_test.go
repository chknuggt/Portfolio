package auth

import (
	"strings"
	"testing"
)

func TestHash(t *testing.T) {
	got, err := Hash("hunter2")
	if err != nil {
		t.Fatalf("Hash returned error: %v", err)
	}
	if !strings.HasPrefix(got, "$argon2id$") {
		t.Errorf("Hash output should start with $argon2id$, got: %s", got)
	}
	t.Logf("hash output: %s", got)
}

func TestVerifyRoundTrip(t *testing.T) {
	encoded, err := Hash("hunter2")
	if err != nil {
		t.Fatalf("Hash returned error: %v", err)
	}

	ok, err := Verify(encoded, "hunter2")
	if err != nil {
		t.Fatalf("Verify returned error: %v", err)
	}
	if !ok {
		t.Errorf("Verify with correct password returned false, want true")
	}

	ok, err = Verify(encoded, "wrong-password")
	if err != nil {
		t.Fatalf("Verify returned error: %v", err)
	}
	if ok {
		t.Errorf("Verify with wrong password returned true, want false")
	}
}
